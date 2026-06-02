import prisma from "../prismaClient.js";

const serializeWatchlistItem = (item) => ({
  product_id: item.product.product_id,
  product_name: item.product.product_name,
  saved_at: item.created_at
});

export const getMyWatchlist = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);

    const items = await prisma.companyWatchlist.findMany({
      where: {
        company_id: current_company_id
      },
      include: {
        product: true
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return res.status(200).json({
      watchlist: items.map(serializeWatchlistItem)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addProductToWatchlist = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const { product_id, product_name } = req.body;

    let product = null;

    if (product_id !== undefined && product_id !== null) {
      const numericProductId = Number(product_id);

      if (Number.isNaN(numericProductId)) {
        return res.status(400).json({ error: "product_id must be a valid number" });
      }

      product = await prisma.product.findUnique({
        where: { product_id: numericProductId }
      });
    } else if (product_name) {
      product = await prisma.product.upsert({
        where: { product_name },
        update: {},
        create: { product_name }
      });
    } else {
      return res.status(400).json({ error: "product_id or product_name is required" });
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const watchlistItem = await prisma.companyWatchlist.upsert({
      where: {
        company_id_product_id: {
          company_id: current_company_id,
          product_id: product.product_id
        }
      },
      update: {},
      create: {
        company_id: current_company_id,
        product_id: product.product_id
      },
      include: {
        product: true
      }
    });

    return res.status(201).json({
      message: "Product saved to watchlist",
      item: serializeWatchlistItem(watchlistItem)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const removeProductFromWatchlist = async (req, res) => {
  try {
    const current_company_id = Number(req.company.company_id);
    const product_id = Number(req.params.productId);

    if (Number.isNaN(product_id)) {
      return res.status(400).json({ error: "productId must be a valid number" });
    }

    const existingItem = await prisma.companyWatchlist.findUnique({
      where: {
        company_id_product_id: {
          company_id: current_company_id,
          product_id
        }
      }
    });

    if (!existingItem) {
      return res.status(404).json({ error: "Watchlist item not found" });
    }

    await prisma.companyWatchlist.delete({
      where: {
        company_id_product_id: {
          company_id: current_company_id,
          product_id
        }
      }
    });

    return res.status(200).json({
      message: "Product removed from watchlist"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
