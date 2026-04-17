
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model Industry
 * 
 */
export type Industry = $Result.DefaultSelection<Prisma.$IndustryPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model CompanyProducts
 * 
 */
export type CompanyProducts = $Result.DefaultSelection<Prisma.$CompanyProductsPayload>
/**
 * Model Region
 * 
 */
export type Region = $Result.DefaultSelection<Prisma.$RegionPayload>
/**
 * Model CompanyRegions
 * 
 */
export type CompanyRegions = $Result.DefaultSelection<Prisma.$CompanyRegionsPayload>
/**
 * Model CompanyTargets
 * 
 */
export type CompanyTargets = $Result.DefaultSelection<Prisma.$CompanyTargetsPayload>
/**
 * Model CompanyMatches
 * 
 */
export type CompanyMatches = $Result.DefaultSelection<Prisma.$CompanyMatchesPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Companies
 * const companies = await prisma.company.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Companies
   * const companies = await prisma.company.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.industry`: Exposes CRUD operations for the **Industry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Industries
    * const industries = await prisma.industry.findMany()
    * ```
    */
  get industry(): Prisma.IndustryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companyProducts`: Exposes CRUD operations for the **CompanyProducts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyProducts
    * const companyProducts = await prisma.companyProducts.findMany()
    * ```
    */
  get companyProducts(): Prisma.CompanyProductsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.region`: Exposes CRUD operations for the **Region** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Regions
    * const regions = await prisma.region.findMany()
    * ```
    */
  get region(): Prisma.RegionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companyRegions`: Exposes CRUD operations for the **CompanyRegions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyRegions
    * const companyRegions = await prisma.companyRegions.findMany()
    * ```
    */
  get companyRegions(): Prisma.CompanyRegionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companyTargets`: Exposes CRUD operations for the **CompanyTargets** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyTargets
    * const companyTargets = await prisma.companyTargets.findMany()
    * ```
    */
  get companyTargets(): Prisma.CompanyTargetsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companyMatches`: Exposes CRUD operations for the **CompanyMatches** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyMatches
    * const companyMatches = await prisma.companyMatches.findMany()
    * ```
    */
  get companyMatches(): Prisma.CompanyMatchesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Company: 'Company',
    Industry: 'Industry',
    Location: 'Location',
    Product: 'Product',
    CompanyProducts: 'CompanyProducts',
    Region: 'Region',
    CompanyRegions: 'CompanyRegions',
    CompanyTargets: 'CompanyTargets',
    CompanyMatches: 'CompanyMatches',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "company" | "industry" | "location" | "product" | "companyProducts" | "region" | "companyRegions" | "companyTargets" | "companyMatches" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      Industry: {
        payload: Prisma.$IndustryPayload<ExtArgs>
        fields: Prisma.IndustryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IndustryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IndustryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>
          }
          findFirst: {
            args: Prisma.IndustryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IndustryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>
          }
          findMany: {
            args: Prisma.IndustryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>[]
          }
          create: {
            args: Prisma.IndustryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>
          }
          createMany: {
            args: Prisma.IndustryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IndustryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>[]
          }
          delete: {
            args: Prisma.IndustryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>
          }
          update: {
            args: Prisma.IndustryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>
          }
          deleteMany: {
            args: Prisma.IndustryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IndustryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IndustryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>[]
          }
          upsert: {
            args: Prisma.IndustryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>
          }
          aggregate: {
            args: Prisma.IndustryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIndustry>
          }
          groupBy: {
            args: Prisma.IndustryGroupByArgs<ExtArgs>
            result: $Utils.Optional<IndustryGroupByOutputType>[]
          }
          count: {
            args: Prisma.IndustryCountArgs<ExtArgs>
            result: $Utils.Optional<IndustryCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      CompanyProducts: {
        payload: Prisma.$CompanyProductsPayload<ExtArgs>
        fields: Prisma.CompanyProductsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyProductsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProductsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyProductsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProductsPayload>
          }
          findFirst: {
            args: Prisma.CompanyProductsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProductsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyProductsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProductsPayload>
          }
          findMany: {
            args: Prisma.CompanyProductsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProductsPayload>[]
          }
          create: {
            args: Prisma.CompanyProductsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProductsPayload>
          }
          createMany: {
            args: Prisma.CompanyProductsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyProductsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProductsPayload>[]
          }
          delete: {
            args: Prisma.CompanyProductsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProductsPayload>
          }
          update: {
            args: Prisma.CompanyProductsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProductsPayload>
          }
          deleteMany: {
            args: Prisma.CompanyProductsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyProductsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyProductsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProductsPayload>[]
          }
          upsert: {
            args: Prisma.CompanyProductsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyProductsPayload>
          }
          aggregate: {
            args: Prisma.CompanyProductsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyProducts>
          }
          groupBy: {
            args: Prisma.CompanyProductsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyProductsGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyProductsCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyProductsCountAggregateOutputType> | number
          }
        }
      }
      Region: {
        payload: Prisma.$RegionPayload<ExtArgs>
        fields: Prisma.RegionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findFirst: {
            args: Prisma.RegionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findMany: {
            args: Prisma.RegionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          create: {
            args: Prisma.RegionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          createMany: {
            args: Prisma.RegionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          delete: {
            args: Prisma.RegionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          update: {
            args: Prisma.RegionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          deleteMany: {
            args: Prisma.RegionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          upsert: {
            args: Prisma.RegionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          aggregate: {
            args: Prisma.RegionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegion>
          }
          groupBy: {
            args: Prisma.RegionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegionCountArgs<ExtArgs>
            result: $Utils.Optional<RegionCountAggregateOutputType> | number
          }
        }
      }
      CompanyRegions: {
        payload: Prisma.$CompanyRegionsPayload<ExtArgs>
        fields: Prisma.CompanyRegionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyRegionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyRegionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyRegionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyRegionsPayload>
          }
          findFirst: {
            args: Prisma.CompanyRegionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyRegionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyRegionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyRegionsPayload>
          }
          findMany: {
            args: Prisma.CompanyRegionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyRegionsPayload>[]
          }
          create: {
            args: Prisma.CompanyRegionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyRegionsPayload>
          }
          createMany: {
            args: Prisma.CompanyRegionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyRegionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyRegionsPayload>[]
          }
          delete: {
            args: Prisma.CompanyRegionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyRegionsPayload>
          }
          update: {
            args: Prisma.CompanyRegionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyRegionsPayload>
          }
          deleteMany: {
            args: Prisma.CompanyRegionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyRegionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyRegionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyRegionsPayload>[]
          }
          upsert: {
            args: Prisma.CompanyRegionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyRegionsPayload>
          }
          aggregate: {
            args: Prisma.CompanyRegionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyRegions>
          }
          groupBy: {
            args: Prisma.CompanyRegionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyRegionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyRegionsCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyRegionsCountAggregateOutputType> | number
          }
        }
      }
      CompanyTargets: {
        payload: Prisma.$CompanyTargetsPayload<ExtArgs>
        fields: Prisma.CompanyTargetsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyTargetsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyTargetsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyTargetsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyTargetsPayload>
          }
          findFirst: {
            args: Prisma.CompanyTargetsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyTargetsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyTargetsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyTargetsPayload>
          }
          findMany: {
            args: Prisma.CompanyTargetsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyTargetsPayload>[]
          }
          create: {
            args: Prisma.CompanyTargetsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyTargetsPayload>
          }
          createMany: {
            args: Prisma.CompanyTargetsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyTargetsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyTargetsPayload>[]
          }
          delete: {
            args: Prisma.CompanyTargetsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyTargetsPayload>
          }
          update: {
            args: Prisma.CompanyTargetsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyTargetsPayload>
          }
          deleteMany: {
            args: Prisma.CompanyTargetsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyTargetsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyTargetsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyTargetsPayload>[]
          }
          upsert: {
            args: Prisma.CompanyTargetsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyTargetsPayload>
          }
          aggregate: {
            args: Prisma.CompanyTargetsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyTargets>
          }
          groupBy: {
            args: Prisma.CompanyTargetsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyTargetsGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyTargetsCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyTargetsCountAggregateOutputType> | number
          }
        }
      }
      CompanyMatches: {
        payload: Prisma.$CompanyMatchesPayload<ExtArgs>
        fields: Prisma.CompanyMatchesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyMatchesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyMatchesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyMatchesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyMatchesPayload>
          }
          findFirst: {
            args: Prisma.CompanyMatchesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyMatchesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyMatchesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyMatchesPayload>
          }
          findMany: {
            args: Prisma.CompanyMatchesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyMatchesPayload>[]
          }
          create: {
            args: Prisma.CompanyMatchesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyMatchesPayload>
          }
          createMany: {
            args: Prisma.CompanyMatchesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyMatchesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyMatchesPayload>[]
          }
          delete: {
            args: Prisma.CompanyMatchesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyMatchesPayload>
          }
          update: {
            args: Prisma.CompanyMatchesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyMatchesPayload>
          }
          deleteMany: {
            args: Prisma.CompanyMatchesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyMatchesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyMatchesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyMatchesPayload>[]
          }
          upsert: {
            args: Prisma.CompanyMatchesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyMatchesPayload>
          }
          aggregate: {
            args: Prisma.CompanyMatchesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyMatches>
          }
          groupBy: {
            args: Prisma.CompanyMatchesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyMatchesGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyMatchesCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyMatchesCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    company?: CompanyOmit
    industry?: IndustryOmit
    location?: LocationOmit
    product?: ProductOmit
    companyProducts?: CompanyProductsOmit
    region?: RegionOmit
    companyRegions?: CompanyRegionsOmit
    companyTargets?: CompanyTargetsOmit
    companyMatches?: CompanyMatchesOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    matches: number
    matched_with: number
    products: number
    regions: number
    targets: number
    target_of: number
    notifications: number
    triggered_notifications: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    matches?: boolean | CompanyCountOutputTypeCountMatchesArgs
    matched_with?: boolean | CompanyCountOutputTypeCountMatched_withArgs
    products?: boolean | CompanyCountOutputTypeCountProductsArgs
    regions?: boolean | CompanyCountOutputTypeCountRegionsArgs
    targets?: boolean | CompanyCountOutputTypeCountTargetsArgs
    target_of?: boolean | CompanyCountOutputTypeCountTarget_ofArgs
    notifications?: boolean | CompanyCountOutputTypeCountNotificationsArgs
    triggered_notifications?: boolean | CompanyCountOutputTypeCountTriggered_notificationsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyMatchesWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountMatched_withArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyMatchesWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyProductsWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountRegionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyRegionsWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountTargetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyTargetsWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountTarget_ofArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyTargetsWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountTriggered_notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type IndustryCountOutputType
   */

  export type IndustryCountOutputType = {
    companies: number
  }

  export type IndustryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | IndustryCountOutputTypeCountCompaniesArgs
  }

  // Custom InputTypes
  /**
   * IndustryCountOutputType without action
   */
  export type IndustryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryCountOutputType
     */
    select?: IndustryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * IndustryCountOutputType without action
   */
  export type IndustryCountOutputTypeCountCompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
  }


  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    companies: number
  }

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | LocationCountOutputTypeCountCompaniesArgs
  }

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountCompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    companies: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | ProductCountOutputTypeCountCompaniesArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountCompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyProductsWhereInput
  }


  /**
   * Count Type RegionCountOutputType
   */

  export type RegionCountOutputType = {
    companies: number
  }

  export type RegionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | RegionCountOutputTypeCountCompaniesArgs
  }

  // Custom InputTypes
  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegionCountOutputType
     */
    select?: RegionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountCompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyRegionsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyAvgAggregateOutputType = {
    company_id: number | null
    number_of_employees: number | null
    year_established: number | null
    industry_id: number | null
    location_id: number | null
  }

  export type CompanySumAggregateOutputType = {
    company_id: number | null
    number_of_employees: number | null
    year_established: number | null
    industry_id: number | null
    location_id: number | null
  }

  export type CompanyMinAggregateOutputType = {
    company_id: number | null
    company_name: string | null
    registration_number: string | null
    business_type: string | null
    number_of_employees: number | null
    year_established: number | null
    company_description: string | null
    created_at: Date | null
    industry_id: number | null
    location_id: number | null
  }

  export type CompanyMaxAggregateOutputType = {
    company_id: number | null
    company_name: string | null
    registration_number: string | null
    business_type: string | null
    number_of_employees: number | null
    year_established: number | null
    company_description: string | null
    created_at: Date | null
    industry_id: number | null
    location_id: number | null
  }

  export type CompanyCountAggregateOutputType = {
    company_id: number
    company_name: number
    registration_number: number
    business_type: number
    number_of_employees: number
    year_established: number
    company_description: number
    created_at: number
    industry_id: number
    location_id: number
    _all: number
  }


  export type CompanyAvgAggregateInputType = {
    company_id?: true
    number_of_employees?: true
    year_established?: true
    industry_id?: true
    location_id?: true
  }

  export type CompanySumAggregateInputType = {
    company_id?: true
    number_of_employees?: true
    year_established?: true
    industry_id?: true
    location_id?: true
  }

  export type CompanyMinAggregateInputType = {
    company_id?: true
    company_name?: true
    registration_number?: true
    business_type?: true
    number_of_employees?: true
    year_established?: true
    company_description?: true
    created_at?: true
    industry_id?: true
    location_id?: true
  }

  export type CompanyMaxAggregateInputType = {
    company_id?: true
    company_name?: true
    registration_number?: true
    business_type?: true
    number_of_employees?: true
    year_established?: true
    company_description?: true
    created_at?: true
    industry_id?: true
    location_id?: true
  }

  export type CompanyCountAggregateInputType = {
    company_id?: true
    company_name?: true
    registration_number?: true
    business_type?: true
    number_of_employees?: true
    year_established?: true
    company_description?: true
    created_at?: true
    industry_id?: true
    location_id?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _avg?: CompanyAvgAggregateInputType
    _sum?: CompanySumAggregateInputType
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    company_id: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees: number | null
    year_established: number | null
    company_description: string | null
    created_at: Date
    industry_id: number | null
    location_id: number | null
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    company_id?: boolean
    company_name?: boolean
    registration_number?: boolean
    business_type?: boolean
    number_of_employees?: boolean
    year_established?: boolean
    company_description?: boolean
    created_at?: boolean
    industry_id?: boolean
    location_id?: boolean
    industry?: boolean | Company$industryArgs<ExtArgs>
    location?: boolean | Company$locationArgs<ExtArgs>
    matches?: boolean | Company$matchesArgs<ExtArgs>
    matched_with?: boolean | Company$matched_withArgs<ExtArgs>
    products?: boolean | Company$productsArgs<ExtArgs>
    regions?: boolean | Company$regionsArgs<ExtArgs>
    targets?: boolean | Company$targetsArgs<ExtArgs>
    target_of?: boolean | Company$target_ofArgs<ExtArgs>
    notifications?: boolean | Company$notificationsArgs<ExtArgs>
    triggered_notifications?: boolean | Company$triggered_notificationsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    company_id?: boolean
    company_name?: boolean
    registration_number?: boolean
    business_type?: boolean
    number_of_employees?: boolean
    year_established?: boolean
    company_description?: boolean
    created_at?: boolean
    industry_id?: boolean
    location_id?: boolean
    industry?: boolean | Company$industryArgs<ExtArgs>
    location?: boolean | Company$locationArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    company_id?: boolean
    company_name?: boolean
    registration_number?: boolean
    business_type?: boolean
    number_of_employees?: boolean
    year_established?: boolean
    company_description?: boolean
    created_at?: boolean
    industry_id?: boolean
    location_id?: boolean
    industry?: boolean | Company$industryArgs<ExtArgs>
    location?: boolean | Company$locationArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    company_id?: boolean
    company_name?: boolean
    registration_number?: boolean
    business_type?: boolean
    number_of_employees?: boolean
    year_established?: boolean
    company_description?: boolean
    created_at?: boolean
    industry_id?: boolean
    location_id?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"company_id" | "company_name" | "registration_number" | "business_type" | "number_of_employees" | "year_established" | "company_description" | "created_at" | "industry_id" | "location_id", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    industry?: boolean | Company$industryArgs<ExtArgs>
    location?: boolean | Company$locationArgs<ExtArgs>
    matches?: boolean | Company$matchesArgs<ExtArgs>
    matched_with?: boolean | Company$matched_withArgs<ExtArgs>
    products?: boolean | Company$productsArgs<ExtArgs>
    regions?: boolean | Company$regionsArgs<ExtArgs>
    targets?: boolean | Company$targetsArgs<ExtArgs>
    target_of?: boolean | Company$target_ofArgs<ExtArgs>
    notifications?: boolean | Company$notificationsArgs<ExtArgs>
    triggered_notifications?: boolean | Company$triggered_notificationsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    industry?: boolean | Company$industryArgs<ExtArgs>
    location?: boolean | Company$locationArgs<ExtArgs>
  }
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    industry?: boolean | Company$industryArgs<ExtArgs>
    location?: boolean | Company$locationArgs<ExtArgs>
  }

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      industry: Prisma.$IndustryPayload<ExtArgs> | null
      location: Prisma.$LocationPayload<ExtArgs> | null
      matches: Prisma.$CompanyMatchesPayload<ExtArgs>[]
      matched_with: Prisma.$CompanyMatchesPayload<ExtArgs>[]
      products: Prisma.$CompanyProductsPayload<ExtArgs>[]
      regions: Prisma.$CompanyRegionsPayload<ExtArgs>[]
      targets: Prisma.$CompanyTargetsPayload<ExtArgs>[]
      target_of: Prisma.$CompanyTargetsPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      triggered_notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      company_id: number
      company_name: string
      registration_number: string
      business_type: string
      number_of_employees: number | null
      year_established: number | null
      company_description: string | null
      created_at: Date
      industry_id: number | null
      location_id: number | null
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `company_id`
     * const companyWithCompany_idOnly = await prisma.company.findMany({ select: { company_id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `company_id`
     * const companyWithCompany_idOnly = await prisma.company.createManyAndReturn({
     *   select: { company_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `company_id`
     * const companyWithCompany_idOnly = await prisma.company.updateManyAndReturn({
     *   select: { company_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    industry<T extends Company$industryArgs<ExtArgs> = {}>(args?: Subset<T, Company$industryArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    location<T extends Company$locationArgs<ExtArgs> = {}>(args?: Subset<T, Company$locationArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    matches<T extends Company$matchesArgs<ExtArgs> = {}>(args?: Subset<T, Company$matchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyMatchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matched_with<T extends Company$matched_withArgs<ExtArgs> = {}>(args?: Subset<T, Company$matched_withArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyMatchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    products<T extends Company$productsArgs<ExtArgs> = {}>(args?: Subset<T, Company$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyProductsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    regions<T extends Company$regionsArgs<ExtArgs> = {}>(args?: Subset<T, Company$regionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyRegionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    targets<T extends Company$targetsArgs<ExtArgs> = {}>(args?: Subset<T, Company$targetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyTargetsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    target_of<T extends Company$target_ofArgs<ExtArgs> = {}>(args?: Subset<T, Company$target_ofArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyTargetsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends Company$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Company$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    triggered_notifications<T extends Company$triggered_notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Company$triggered_notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly company_id: FieldRef<"Company", 'Int'>
    readonly company_name: FieldRef<"Company", 'String'>
    readonly registration_number: FieldRef<"Company", 'String'>
    readonly business_type: FieldRef<"Company", 'String'>
    readonly number_of_employees: FieldRef<"Company", 'Int'>
    readonly year_established: FieldRef<"Company", 'Int'>
    readonly company_description: FieldRef<"Company", 'String'>
    readonly created_at: FieldRef<"Company", 'DateTime'>
    readonly industry_id: FieldRef<"Company", 'Int'>
    readonly location_id: FieldRef<"Company", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.industry
   */
  export type Company$industryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    where?: IndustryWhereInput
  }

  /**
   * Company.location
   */
  export type Company$locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
  }

  /**
   * Company.matches
   */
  export type Company$matchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesInclude<ExtArgs> | null
    where?: CompanyMatchesWhereInput
    orderBy?: CompanyMatchesOrderByWithRelationInput | CompanyMatchesOrderByWithRelationInput[]
    cursor?: CompanyMatchesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyMatchesScalarFieldEnum | CompanyMatchesScalarFieldEnum[]
  }

  /**
   * Company.matched_with
   */
  export type Company$matched_withArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesInclude<ExtArgs> | null
    where?: CompanyMatchesWhereInput
    orderBy?: CompanyMatchesOrderByWithRelationInput | CompanyMatchesOrderByWithRelationInput[]
    cursor?: CompanyMatchesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyMatchesScalarFieldEnum | CompanyMatchesScalarFieldEnum[]
  }

  /**
   * Company.products
   */
  export type Company$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsInclude<ExtArgs> | null
    where?: CompanyProductsWhereInput
    orderBy?: CompanyProductsOrderByWithRelationInput | CompanyProductsOrderByWithRelationInput[]
    cursor?: CompanyProductsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyProductsScalarFieldEnum | CompanyProductsScalarFieldEnum[]
  }

  /**
   * Company.regions
   */
  export type Company$regionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsInclude<ExtArgs> | null
    where?: CompanyRegionsWhereInput
    orderBy?: CompanyRegionsOrderByWithRelationInput | CompanyRegionsOrderByWithRelationInput[]
    cursor?: CompanyRegionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyRegionsScalarFieldEnum | CompanyRegionsScalarFieldEnum[]
  }

  /**
   * Company.targets
   */
  export type Company$targetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsInclude<ExtArgs> | null
    where?: CompanyTargetsWhereInput
    orderBy?: CompanyTargetsOrderByWithRelationInput | CompanyTargetsOrderByWithRelationInput[]
    cursor?: CompanyTargetsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyTargetsScalarFieldEnum | CompanyTargetsScalarFieldEnum[]
  }

  /**
   * Company.target_of
   */
  export type Company$target_ofArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsInclude<ExtArgs> | null
    where?: CompanyTargetsWhereInput
    orderBy?: CompanyTargetsOrderByWithRelationInput | CompanyTargetsOrderByWithRelationInput[]
    cursor?: CompanyTargetsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyTargetsScalarFieldEnum | CompanyTargetsScalarFieldEnum[]
  }

  /**
   * Company.notifications
   */
  export type Company$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Company.triggered_notifications
   */
  export type Company$triggered_notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model Industry
   */

  export type AggregateIndustry = {
    _count: IndustryCountAggregateOutputType | null
    _avg: IndustryAvgAggregateOutputType | null
    _sum: IndustrySumAggregateOutputType | null
    _min: IndustryMinAggregateOutputType | null
    _max: IndustryMaxAggregateOutputType | null
  }

  export type IndustryAvgAggregateOutputType = {
    industry_id: number | null
  }

  export type IndustrySumAggregateOutputType = {
    industry_id: number | null
  }

  export type IndustryMinAggregateOutputType = {
    industry_id: number | null
    industry_name: string | null
  }

  export type IndustryMaxAggregateOutputType = {
    industry_id: number | null
    industry_name: string | null
  }

  export type IndustryCountAggregateOutputType = {
    industry_id: number
    industry_name: number
    _all: number
  }


  export type IndustryAvgAggregateInputType = {
    industry_id?: true
  }

  export type IndustrySumAggregateInputType = {
    industry_id?: true
  }

  export type IndustryMinAggregateInputType = {
    industry_id?: true
    industry_name?: true
  }

  export type IndustryMaxAggregateInputType = {
    industry_id?: true
    industry_name?: true
  }

  export type IndustryCountAggregateInputType = {
    industry_id?: true
    industry_name?: true
    _all?: true
  }

  export type IndustryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Industry to aggregate.
     */
    where?: IndustryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Industries to fetch.
     */
    orderBy?: IndustryOrderByWithRelationInput | IndustryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IndustryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Industries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Industries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Industries
    **/
    _count?: true | IndustryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IndustryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IndustrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IndustryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IndustryMaxAggregateInputType
  }

  export type GetIndustryAggregateType<T extends IndustryAggregateArgs> = {
        [P in keyof T & keyof AggregateIndustry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIndustry[P]>
      : GetScalarType<T[P], AggregateIndustry[P]>
  }




  export type IndustryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IndustryWhereInput
    orderBy?: IndustryOrderByWithAggregationInput | IndustryOrderByWithAggregationInput[]
    by: IndustryScalarFieldEnum[] | IndustryScalarFieldEnum
    having?: IndustryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IndustryCountAggregateInputType | true
    _avg?: IndustryAvgAggregateInputType
    _sum?: IndustrySumAggregateInputType
    _min?: IndustryMinAggregateInputType
    _max?: IndustryMaxAggregateInputType
  }

  export type IndustryGroupByOutputType = {
    industry_id: number
    industry_name: string
    _count: IndustryCountAggregateOutputType | null
    _avg: IndustryAvgAggregateOutputType | null
    _sum: IndustrySumAggregateOutputType | null
    _min: IndustryMinAggregateOutputType | null
    _max: IndustryMaxAggregateOutputType | null
  }

  type GetIndustryGroupByPayload<T extends IndustryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IndustryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IndustryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IndustryGroupByOutputType[P]>
            : GetScalarType<T[P], IndustryGroupByOutputType[P]>
        }
      >
    >


  export type IndustrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry_id?: boolean
    industry_name?: boolean
    companies?: boolean | Industry$companiesArgs<ExtArgs>
    _count?: boolean | IndustryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["industry"]>

  export type IndustrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry_id?: boolean
    industry_name?: boolean
  }, ExtArgs["result"]["industry"]>

  export type IndustrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    industry_id?: boolean
    industry_name?: boolean
  }, ExtArgs["result"]["industry"]>

  export type IndustrySelectScalar = {
    industry_id?: boolean
    industry_name?: boolean
  }

  export type IndustryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"industry_id" | "industry_name", ExtArgs["result"]["industry"]>
  export type IndustryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | Industry$companiesArgs<ExtArgs>
    _count?: boolean | IndustryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type IndustryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type IndustryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $IndustryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Industry"
    objects: {
      companies: Prisma.$CompanyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      industry_id: number
      industry_name: string
    }, ExtArgs["result"]["industry"]>
    composites: {}
  }

  type IndustryGetPayload<S extends boolean | null | undefined | IndustryDefaultArgs> = $Result.GetResult<Prisma.$IndustryPayload, S>

  type IndustryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IndustryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IndustryCountAggregateInputType | true
    }

  export interface IndustryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Industry'], meta: { name: 'Industry' } }
    /**
     * Find zero or one Industry that matches the filter.
     * @param {IndustryFindUniqueArgs} args - Arguments to find a Industry
     * @example
     * // Get one Industry
     * const industry = await prisma.industry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IndustryFindUniqueArgs>(args: SelectSubset<T, IndustryFindUniqueArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Industry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IndustryFindUniqueOrThrowArgs} args - Arguments to find a Industry
     * @example
     * // Get one Industry
     * const industry = await prisma.industry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IndustryFindUniqueOrThrowArgs>(args: SelectSubset<T, IndustryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Industry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryFindFirstArgs} args - Arguments to find a Industry
     * @example
     * // Get one Industry
     * const industry = await prisma.industry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IndustryFindFirstArgs>(args?: SelectSubset<T, IndustryFindFirstArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Industry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryFindFirstOrThrowArgs} args - Arguments to find a Industry
     * @example
     * // Get one Industry
     * const industry = await prisma.industry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IndustryFindFirstOrThrowArgs>(args?: SelectSubset<T, IndustryFindFirstOrThrowArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Industries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Industries
     * const industries = await prisma.industry.findMany()
     * 
     * // Get first 10 Industries
     * const industries = await prisma.industry.findMany({ take: 10 })
     * 
     * // Only select the `industry_id`
     * const industryWithIndustry_idOnly = await prisma.industry.findMany({ select: { industry_id: true } })
     * 
     */
    findMany<T extends IndustryFindManyArgs>(args?: SelectSubset<T, IndustryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Industry.
     * @param {IndustryCreateArgs} args - Arguments to create a Industry.
     * @example
     * // Create one Industry
     * const Industry = await prisma.industry.create({
     *   data: {
     *     // ... data to create a Industry
     *   }
     * })
     * 
     */
    create<T extends IndustryCreateArgs>(args: SelectSubset<T, IndustryCreateArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Industries.
     * @param {IndustryCreateManyArgs} args - Arguments to create many Industries.
     * @example
     * // Create many Industries
     * const industry = await prisma.industry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IndustryCreateManyArgs>(args?: SelectSubset<T, IndustryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Industries and returns the data saved in the database.
     * @param {IndustryCreateManyAndReturnArgs} args - Arguments to create many Industries.
     * @example
     * // Create many Industries
     * const industry = await prisma.industry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Industries and only return the `industry_id`
     * const industryWithIndustry_idOnly = await prisma.industry.createManyAndReturn({
     *   select: { industry_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IndustryCreateManyAndReturnArgs>(args?: SelectSubset<T, IndustryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Industry.
     * @param {IndustryDeleteArgs} args - Arguments to delete one Industry.
     * @example
     * // Delete one Industry
     * const Industry = await prisma.industry.delete({
     *   where: {
     *     // ... filter to delete one Industry
     *   }
     * })
     * 
     */
    delete<T extends IndustryDeleteArgs>(args: SelectSubset<T, IndustryDeleteArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Industry.
     * @param {IndustryUpdateArgs} args - Arguments to update one Industry.
     * @example
     * // Update one Industry
     * const industry = await prisma.industry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IndustryUpdateArgs>(args: SelectSubset<T, IndustryUpdateArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Industries.
     * @param {IndustryDeleteManyArgs} args - Arguments to filter Industries to delete.
     * @example
     * // Delete a few Industries
     * const { count } = await prisma.industry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IndustryDeleteManyArgs>(args?: SelectSubset<T, IndustryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Industries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Industries
     * const industry = await prisma.industry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IndustryUpdateManyArgs>(args: SelectSubset<T, IndustryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Industries and returns the data updated in the database.
     * @param {IndustryUpdateManyAndReturnArgs} args - Arguments to update many Industries.
     * @example
     * // Update many Industries
     * const industry = await prisma.industry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Industries and only return the `industry_id`
     * const industryWithIndustry_idOnly = await prisma.industry.updateManyAndReturn({
     *   select: { industry_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IndustryUpdateManyAndReturnArgs>(args: SelectSubset<T, IndustryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Industry.
     * @param {IndustryUpsertArgs} args - Arguments to update or create a Industry.
     * @example
     * // Update or create a Industry
     * const industry = await prisma.industry.upsert({
     *   create: {
     *     // ... data to create a Industry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Industry we want to update
     *   }
     * })
     */
    upsert<T extends IndustryUpsertArgs>(args: SelectSubset<T, IndustryUpsertArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Industries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryCountArgs} args - Arguments to filter Industries to count.
     * @example
     * // Count the number of Industries
     * const count = await prisma.industry.count({
     *   where: {
     *     // ... the filter for the Industries we want to count
     *   }
     * })
    **/
    count<T extends IndustryCountArgs>(
      args?: Subset<T, IndustryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IndustryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Industry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IndustryAggregateArgs>(args: Subset<T, IndustryAggregateArgs>): Prisma.PrismaPromise<GetIndustryAggregateType<T>>

    /**
     * Group by Industry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IndustryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IndustryGroupByArgs['orderBy'] }
        : { orderBy?: IndustryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IndustryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIndustryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Industry model
   */
  readonly fields: IndustryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Industry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IndustryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    companies<T extends Industry$companiesArgs<ExtArgs> = {}>(args?: Subset<T, Industry$companiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Industry model
   */
  interface IndustryFieldRefs {
    readonly industry_id: FieldRef<"Industry", 'Int'>
    readonly industry_name: FieldRef<"Industry", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Industry findUnique
   */
  export type IndustryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * Filter, which Industry to fetch.
     */
    where: IndustryWhereUniqueInput
  }

  /**
   * Industry findUniqueOrThrow
   */
  export type IndustryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * Filter, which Industry to fetch.
     */
    where: IndustryWhereUniqueInput
  }

  /**
   * Industry findFirst
   */
  export type IndustryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * Filter, which Industry to fetch.
     */
    where?: IndustryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Industries to fetch.
     */
    orderBy?: IndustryOrderByWithRelationInput | IndustryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Industries.
     */
    cursor?: IndustryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Industries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Industries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Industries.
     */
    distinct?: IndustryScalarFieldEnum | IndustryScalarFieldEnum[]
  }

  /**
   * Industry findFirstOrThrow
   */
  export type IndustryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * Filter, which Industry to fetch.
     */
    where?: IndustryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Industries to fetch.
     */
    orderBy?: IndustryOrderByWithRelationInput | IndustryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Industries.
     */
    cursor?: IndustryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Industries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Industries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Industries.
     */
    distinct?: IndustryScalarFieldEnum | IndustryScalarFieldEnum[]
  }

  /**
   * Industry findMany
   */
  export type IndustryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * Filter, which Industries to fetch.
     */
    where?: IndustryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Industries to fetch.
     */
    orderBy?: IndustryOrderByWithRelationInput | IndustryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Industries.
     */
    cursor?: IndustryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Industries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Industries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Industries.
     */
    distinct?: IndustryScalarFieldEnum | IndustryScalarFieldEnum[]
  }

  /**
   * Industry create
   */
  export type IndustryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * The data needed to create a Industry.
     */
    data: XOR<IndustryCreateInput, IndustryUncheckedCreateInput>
  }

  /**
   * Industry createMany
   */
  export type IndustryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Industries.
     */
    data: IndustryCreateManyInput | IndustryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Industry createManyAndReturn
   */
  export type IndustryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * The data used to create many Industries.
     */
    data: IndustryCreateManyInput | IndustryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Industry update
   */
  export type IndustryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * The data needed to update a Industry.
     */
    data: XOR<IndustryUpdateInput, IndustryUncheckedUpdateInput>
    /**
     * Choose, which Industry to update.
     */
    where: IndustryWhereUniqueInput
  }

  /**
   * Industry updateMany
   */
  export type IndustryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Industries.
     */
    data: XOR<IndustryUpdateManyMutationInput, IndustryUncheckedUpdateManyInput>
    /**
     * Filter which Industries to update
     */
    where?: IndustryWhereInput
    /**
     * Limit how many Industries to update.
     */
    limit?: number
  }

  /**
   * Industry updateManyAndReturn
   */
  export type IndustryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * The data used to update Industries.
     */
    data: XOR<IndustryUpdateManyMutationInput, IndustryUncheckedUpdateManyInput>
    /**
     * Filter which Industries to update
     */
    where?: IndustryWhereInput
    /**
     * Limit how many Industries to update.
     */
    limit?: number
  }

  /**
   * Industry upsert
   */
  export type IndustryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * The filter to search for the Industry to update in case it exists.
     */
    where: IndustryWhereUniqueInput
    /**
     * In case the Industry found by the `where` argument doesn't exist, create a new Industry with this data.
     */
    create: XOR<IndustryCreateInput, IndustryUncheckedCreateInput>
    /**
     * In case the Industry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IndustryUpdateInput, IndustryUncheckedUpdateInput>
  }

  /**
   * Industry delete
   */
  export type IndustryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * Filter which Industry to delete.
     */
    where: IndustryWhereUniqueInput
  }

  /**
   * Industry deleteMany
   */
  export type IndustryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Industries to delete
     */
    where?: IndustryWhereInput
    /**
     * Limit how many Industries to delete.
     */
    limit?: number
  }

  /**
   * Industry.companies
   */
  export type Industry$companiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    cursor?: CompanyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Industry without action
   */
  export type IndustryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationAvgAggregateOutputType = {
    location_id: number | null
  }

  export type LocationSumAggregateOutputType = {
    location_id: number | null
  }

  export type LocationMinAggregateOutputType = {
    location_id: number | null
    country: string | null
  }

  export type LocationMaxAggregateOutputType = {
    location_id: number | null
    country: string | null
  }

  export type LocationCountAggregateOutputType = {
    location_id: number
    country: number
    _all: number
  }


  export type LocationAvgAggregateInputType = {
    location_id?: true
  }

  export type LocationSumAggregateInputType = {
    location_id?: true
  }

  export type LocationMinAggregateInputType = {
    location_id?: true
    country?: true
  }

  export type LocationMaxAggregateInputType = {
    location_id?: true
    country?: true
  }

  export type LocationCountAggregateInputType = {
    location_id?: true
    country?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _avg?: LocationAvgAggregateInputType
    _sum?: LocationSumAggregateInputType
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    location_id: number
    country: string
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    location_id?: boolean
    country?: boolean
    companies?: boolean | Location$companiesArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    location_id?: boolean
    country?: boolean
  }, ExtArgs["result"]["location"]>

  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    location_id?: boolean
    country?: boolean
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    location_id?: boolean
    country?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"location_id" | "country", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | Location$companiesArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      companies: Prisma.$CompanyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      location_id: number
      country: string
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `location_id`
     * const locationWithLocation_idOnly = await prisma.location.findMany({ select: { location_id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `location_id`
     * const locationWithLocation_idOnly = await prisma.location.createManyAndReturn({
     *   select: { location_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locations and only return the `location_id`
     * const locationWithLocation_idOnly = await prisma.location.updateManyAndReturn({
     *   select: { location_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    companies<T extends Location$companiesArgs<ExtArgs> = {}>(args?: Subset<T, Location$companiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly location_id: FieldRef<"Location", 'Int'>
    readonly country: FieldRef<"Location", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location.companies
   */
  export type Location$companiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    cursor?: CompanyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    product_id: number | null
  }

  export type ProductSumAggregateOutputType = {
    product_id: number | null
  }

  export type ProductMinAggregateOutputType = {
    product_id: number | null
    product_name: string | null
  }

  export type ProductMaxAggregateOutputType = {
    product_id: number | null
    product_name: string | null
  }

  export type ProductCountAggregateOutputType = {
    product_id: number
    product_name: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    product_id?: true
  }

  export type ProductSumAggregateInputType = {
    product_id?: true
  }

  export type ProductMinAggregateInputType = {
    product_id?: true
    product_name?: true
  }

  export type ProductMaxAggregateInputType = {
    product_id?: true
    product_name?: true
  }

  export type ProductCountAggregateInputType = {
    product_id?: true
    product_name?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    product_id: number
    product_name: string
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    product_id?: boolean
    product_name?: boolean
    companies?: boolean | Product$companiesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    product_id?: boolean
    product_name?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    product_id?: boolean
    product_name?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    product_id?: boolean
    product_name?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"product_id" | "product_name", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | Product$companiesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      companies: Prisma.$CompanyProductsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      product_id: number
      product_name: string
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `product_id`
     * const productWithProduct_idOnly = await prisma.product.findMany({ select: { product_id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `product_id`
     * const productWithProduct_idOnly = await prisma.product.createManyAndReturn({
     *   select: { product_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `product_id`
     * const productWithProduct_idOnly = await prisma.product.updateManyAndReturn({
     *   select: { product_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    companies<T extends Product$companiesArgs<ExtArgs> = {}>(args?: Subset<T, Product$companiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyProductsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly product_id: FieldRef<"Product", 'Int'>
    readonly product_name: FieldRef<"Product", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.companies
   */
  export type Product$companiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsInclude<ExtArgs> | null
    where?: CompanyProductsWhereInput
    orderBy?: CompanyProductsOrderByWithRelationInput | CompanyProductsOrderByWithRelationInput[]
    cursor?: CompanyProductsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyProductsScalarFieldEnum | CompanyProductsScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model CompanyProducts
   */

  export type AggregateCompanyProducts = {
    _count: CompanyProductsCountAggregateOutputType | null
    _avg: CompanyProductsAvgAggregateOutputType | null
    _sum: CompanyProductsSumAggregateOutputType | null
    _min: CompanyProductsMinAggregateOutputType | null
    _max: CompanyProductsMaxAggregateOutputType | null
  }

  export type CompanyProductsAvgAggregateOutputType = {
    company_id: number | null
    product_id: number | null
  }

  export type CompanyProductsSumAggregateOutputType = {
    company_id: number | null
    product_id: number | null
  }

  export type CompanyProductsMinAggregateOutputType = {
    company_id: number | null
    product_id: number | null
  }

  export type CompanyProductsMaxAggregateOutputType = {
    company_id: number | null
    product_id: number | null
  }

  export type CompanyProductsCountAggregateOutputType = {
    company_id: number
    product_id: number
    _all: number
  }


  export type CompanyProductsAvgAggregateInputType = {
    company_id?: true
    product_id?: true
  }

  export type CompanyProductsSumAggregateInputType = {
    company_id?: true
    product_id?: true
  }

  export type CompanyProductsMinAggregateInputType = {
    company_id?: true
    product_id?: true
  }

  export type CompanyProductsMaxAggregateInputType = {
    company_id?: true
    product_id?: true
  }

  export type CompanyProductsCountAggregateInputType = {
    company_id?: true
    product_id?: true
    _all?: true
  }

  export type CompanyProductsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyProducts to aggregate.
     */
    where?: CompanyProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyProducts to fetch.
     */
    orderBy?: CompanyProductsOrderByWithRelationInput | CompanyProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyProducts
    **/
    _count?: true | CompanyProductsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyProductsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanyProductsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyProductsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyProductsMaxAggregateInputType
  }

  export type GetCompanyProductsAggregateType<T extends CompanyProductsAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyProducts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyProducts[P]>
      : GetScalarType<T[P], AggregateCompanyProducts[P]>
  }




  export type CompanyProductsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyProductsWhereInput
    orderBy?: CompanyProductsOrderByWithAggregationInput | CompanyProductsOrderByWithAggregationInput[]
    by: CompanyProductsScalarFieldEnum[] | CompanyProductsScalarFieldEnum
    having?: CompanyProductsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyProductsCountAggregateInputType | true
    _avg?: CompanyProductsAvgAggregateInputType
    _sum?: CompanyProductsSumAggregateInputType
    _min?: CompanyProductsMinAggregateInputType
    _max?: CompanyProductsMaxAggregateInputType
  }

  export type CompanyProductsGroupByOutputType = {
    company_id: number
    product_id: number
    _count: CompanyProductsCountAggregateOutputType | null
    _avg: CompanyProductsAvgAggregateOutputType | null
    _sum: CompanyProductsSumAggregateOutputType | null
    _min: CompanyProductsMinAggregateOutputType | null
    _max: CompanyProductsMaxAggregateOutputType | null
  }

  type GetCompanyProductsGroupByPayload<T extends CompanyProductsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyProductsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyProductsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyProductsGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyProductsGroupByOutputType[P]>
        }
      >
    >


  export type CompanyProductsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    company_id?: boolean
    product_id?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyProducts"]>

  export type CompanyProductsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    company_id?: boolean
    product_id?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyProducts"]>

  export type CompanyProductsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    company_id?: boolean
    product_id?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyProducts"]>

  export type CompanyProductsSelectScalar = {
    company_id?: boolean
    product_id?: boolean
  }

  export type CompanyProductsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"company_id" | "product_id", ExtArgs["result"]["companyProducts"]>
  export type CompanyProductsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type CompanyProductsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type CompanyProductsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $CompanyProductsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanyProducts"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      company_id: number
      product_id: number
    }, ExtArgs["result"]["companyProducts"]>
    composites: {}
  }

  type CompanyProductsGetPayload<S extends boolean | null | undefined | CompanyProductsDefaultArgs> = $Result.GetResult<Prisma.$CompanyProductsPayload, S>

  type CompanyProductsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyProductsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyProductsCountAggregateInputType | true
    }

  export interface CompanyProductsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanyProducts'], meta: { name: 'CompanyProducts' } }
    /**
     * Find zero or one CompanyProducts that matches the filter.
     * @param {CompanyProductsFindUniqueArgs} args - Arguments to find a CompanyProducts
     * @example
     * // Get one CompanyProducts
     * const companyProducts = await prisma.companyProducts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyProductsFindUniqueArgs>(args: SelectSubset<T, CompanyProductsFindUniqueArgs<ExtArgs>>): Prisma__CompanyProductsClient<$Result.GetResult<Prisma.$CompanyProductsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompanyProducts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyProductsFindUniqueOrThrowArgs} args - Arguments to find a CompanyProducts
     * @example
     * // Get one CompanyProducts
     * const companyProducts = await prisma.companyProducts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyProductsFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyProductsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyProductsClient<$Result.GetResult<Prisma.$CompanyProductsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProductsFindFirstArgs} args - Arguments to find a CompanyProducts
     * @example
     * // Get one CompanyProducts
     * const companyProducts = await prisma.companyProducts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyProductsFindFirstArgs>(args?: SelectSubset<T, CompanyProductsFindFirstArgs<ExtArgs>>): Prisma__CompanyProductsClient<$Result.GetResult<Prisma.$CompanyProductsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyProducts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProductsFindFirstOrThrowArgs} args - Arguments to find a CompanyProducts
     * @example
     * // Get one CompanyProducts
     * const companyProducts = await prisma.companyProducts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyProductsFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyProductsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyProductsClient<$Result.GetResult<Prisma.$CompanyProductsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanyProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProductsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyProducts
     * const companyProducts = await prisma.companyProducts.findMany()
     * 
     * // Get first 10 CompanyProducts
     * const companyProducts = await prisma.companyProducts.findMany({ take: 10 })
     * 
     * // Only select the `company_id`
     * const companyProductsWithCompany_idOnly = await prisma.companyProducts.findMany({ select: { company_id: true } })
     * 
     */
    findMany<T extends CompanyProductsFindManyArgs>(args?: SelectSubset<T, CompanyProductsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyProductsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompanyProducts.
     * @param {CompanyProductsCreateArgs} args - Arguments to create a CompanyProducts.
     * @example
     * // Create one CompanyProducts
     * const CompanyProducts = await prisma.companyProducts.create({
     *   data: {
     *     // ... data to create a CompanyProducts
     *   }
     * })
     * 
     */
    create<T extends CompanyProductsCreateArgs>(args: SelectSubset<T, CompanyProductsCreateArgs<ExtArgs>>): Prisma__CompanyProductsClient<$Result.GetResult<Prisma.$CompanyProductsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompanyProducts.
     * @param {CompanyProductsCreateManyArgs} args - Arguments to create many CompanyProducts.
     * @example
     * // Create many CompanyProducts
     * const companyProducts = await prisma.companyProducts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyProductsCreateManyArgs>(args?: SelectSubset<T, CompanyProductsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompanyProducts and returns the data saved in the database.
     * @param {CompanyProductsCreateManyAndReturnArgs} args - Arguments to create many CompanyProducts.
     * @example
     * // Create many CompanyProducts
     * const companyProducts = await prisma.companyProducts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompanyProducts and only return the `company_id`
     * const companyProductsWithCompany_idOnly = await prisma.companyProducts.createManyAndReturn({
     *   select: { company_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyProductsCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyProductsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyProductsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CompanyProducts.
     * @param {CompanyProductsDeleteArgs} args - Arguments to delete one CompanyProducts.
     * @example
     * // Delete one CompanyProducts
     * const CompanyProducts = await prisma.companyProducts.delete({
     *   where: {
     *     // ... filter to delete one CompanyProducts
     *   }
     * })
     * 
     */
    delete<T extends CompanyProductsDeleteArgs>(args: SelectSubset<T, CompanyProductsDeleteArgs<ExtArgs>>): Prisma__CompanyProductsClient<$Result.GetResult<Prisma.$CompanyProductsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompanyProducts.
     * @param {CompanyProductsUpdateArgs} args - Arguments to update one CompanyProducts.
     * @example
     * // Update one CompanyProducts
     * const companyProducts = await prisma.companyProducts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyProductsUpdateArgs>(args: SelectSubset<T, CompanyProductsUpdateArgs<ExtArgs>>): Prisma__CompanyProductsClient<$Result.GetResult<Prisma.$CompanyProductsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompanyProducts.
     * @param {CompanyProductsDeleteManyArgs} args - Arguments to filter CompanyProducts to delete.
     * @example
     * // Delete a few CompanyProducts
     * const { count } = await prisma.companyProducts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyProductsDeleteManyArgs>(args?: SelectSubset<T, CompanyProductsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProductsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyProducts
     * const companyProducts = await prisma.companyProducts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyProductsUpdateManyArgs>(args: SelectSubset<T, CompanyProductsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyProducts and returns the data updated in the database.
     * @param {CompanyProductsUpdateManyAndReturnArgs} args - Arguments to update many CompanyProducts.
     * @example
     * // Update many CompanyProducts
     * const companyProducts = await prisma.companyProducts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CompanyProducts and only return the `company_id`
     * const companyProductsWithCompany_idOnly = await prisma.companyProducts.updateManyAndReturn({
     *   select: { company_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyProductsUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyProductsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyProductsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CompanyProducts.
     * @param {CompanyProductsUpsertArgs} args - Arguments to update or create a CompanyProducts.
     * @example
     * // Update or create a CompanyProducts
     * const companyProducts = await prisma.companyProducts.upsert({
     *   create: {
     *     // ... data to create a CompanyProducts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyProducts we want to update
     *   }
     * })
     */
    upsert<T extends CompanyProductsUpsertArgs>(args: SelectSubset<T, CompanyProductsUpsertArgs<ExtArgs>>): Prisma__CompanyProductsClient<$Result.GetResult<Prisma.$CompanyProductsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompanyProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProductsCountArgs} args - Arguments to filter CompanyProducts to count.
     * @example
     * // Count the number of CompanyProducts
     * const count = await prisma.companyProducts.count({
     *   where: {
     *     // ... the filter for the CompanyProducts we want to count
     *   }
     * })
    **/
    count<T extends CompanyProductsCountArgs>(
      args?: Subset<T, CompanyProductsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyProductsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProductsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyProductsAggregateArgs>(args: Subset<T, CompanyProductsAggregateArgs>): Prisma.PrismaPromise<GetCompanyProductsAggregateType<T>>

    /**
     * Group by CompanyProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyProductsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyProductsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyProductsGroupByArgs['orderBy'] }
        : { orderBy?: CompanyProductsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyProductsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyProductsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanyProducts model
   */
  readonly fields: CompanyProductsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyProducts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyProductsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanyProducts model
   */
  interface CompanyProductsFieldRefs {
    readonly company_id: FieldRef<"CompanyProducts", 'Int'>
    readonly product_id: FieldRef<"CompanyProducts", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CompanyProducts findUnique
   */
  export type CompanyProductsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyProducts to fetch.
     */
    where: CompanyProductsWhereUniqueInput
  }

  /**
   * CompanyProducts findUniqueOrThrow
   */
  export type CompanyProductsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyProducts to fetch.
     */
    where: CompanyProductsWhereUniqueInput
  }

  /**
   * CompanyProducts findFirst
   */
  export type CompanyProductsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyProducts to fetch.
     */
    where?: CompanyProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyProducts to fetch.
     */
    orderBy?: CompanyProductsOrderByWithRelationInput | CompanyProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyProducts.
     */
    cursor?: CompanyProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyProducts.
     */
    distinct?: CompanyProductsScalarFieldEnum | CompanyProductsScalarFieldEnum[]
  }

  /**
   * CompanyProducts findFirstOrThrow
   */
  export type CompanyProductsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyProducts to fetch.
     */
    where?: CompanyProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyProducts to fetch.
     */
    orderBy?: CompanyProductsOrderByWithRelationInput | CompanyProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyProducts.
     */
    cursor?: CompanyProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyProducts.
     */
    distinct?: CompanyProductsScalarFieldEnum | CompanyProductsScalarFieldEnum[]
  }

  /**
   * CompanyProducts findMany
   */
  export type CompanyProductsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyProducts to fetch.
     */
    where?: CompanyProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyProducts to fetch.
     */
    orderBy?: CompanyProductsOrderByWithRelationInput | CompanyProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyProducts.
     */
    cursor?: CompanyProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyProducts.
     */
    distinct?: CompanyProductsScalarFieldEnum | CompanyProductsScalarFieldEnum[]
  }

  /**
   * CompanyProducts create
   */
  export type CompanyProductsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsInclude<ExtArgs> | null
    /**
     * The data needed to create a CompanyProducts.
     */
    data: XOR<CompanyProductsCreateInput, CompanyProductsUncheckedCreateInput>
  }

  /**
   * CompanyProducts createMany
   */
  export type CompanyProductsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanyProducts.
     */
    data: CompanyProductsCreateManyInput | CompanyProductsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanyProducts createManyAndReturn
   */
  export type CompanyProductsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * The data used to create many CompanyProducts.
     */
    data: CompanyProductsCreateManyInput | CompanyProductsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyProducts update
   */
  export type CompanyProductsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsInclude<ExtArgs> | null
    /**
     * The data needed to update a CompanyProducts.
     */
    data: XOR<CompanyProductsUpdateInput, CompanyProductsUncheckedUpdateInput>
    /**
     * Choose, which CompanyProducts to update.
     */
    where: CompanyProductsWhereUniqueInput
  }

  /**
   * CompanyProducts updateMany
   */
  export type CompanyProductsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanyProducts.
     */
    data: XOR<CompanyProductsUpdateManyMutationInput, CompanyProductsUncheckedUpdateManyInput>
    /**
     * Filter which CompanyProducts to update
     */
    where?: CompanyProductsWhereInput
    /**
     * Limit how many CompanyProducts to update.
     */
    limit?: number
  }

  /**
   * CompanyProducts updateManyAndReturn
   */
  export type CompanyProductsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * The data used to update CompanyProducts.
     */
    data: XOR<CompanyProductsUpdateManyMutationInput, CompanyProductsUncheckedUpdateManyInput>
    /**
     * Filter which CompanyProducts to update
     */
    where?: CompanyProductsWhereInput
    /**
     * Limit how many CompanyProducts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyProducts upsert
   */
  export type CompanyProductsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsInclude<ExtArgs> | null
    /**
     * The filter to search for the CompanyProducts to update in case it exists.
     */
    where: CompanyProductsWhereUniqueInput
    /**
     * In case the CompanyProducts found by the `where` argument doesn't exist, create a new CompanyProducts with this data.
     */
    create: XOR<CompanyProductsCreateInput, CompanyProductsUncheckedCreateInput>
    /**
     * In case the CompanyProducts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyProductsUpdateInput, CompanyProductsUncheckedUpdateInput>
  }

  /**
   * CompanyProducts delete
   */
  export type CompanyProductsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsInclude<ExtArgs> | null
    /**
     * Filter which CompanyProducts to delete.
     */
    where: CompanyProductsWhereUniqueInput
  }

  /**
   * CompanyProducts deleteMany
   */
  export type CompanyProductsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyProducts to delete
     */
    where?: CompanyProductsWhereInput
    /**
     * Limit how many CompanyProducts to delete.
     */
    limit?: number
  }

  /**
   * CompanyProducts without action
   */
  export type CompanyProductsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyProducts
     */
    select?: CompanyProductsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyProducts
     */
    omit?: CompanyProductsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyProductsInclude<ExtArgs> | null
  }


  /**
   * Model Region
   */

  export type AggregateRegion = {
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  export type RegionAvgAggregateOutputType = {
    region_id: number | null
  }

  export type RegionSumAggregateOutputType = {
    region_id: number | null
  }

  export type RegionMinAggregateOutputType = {
    region_id: number | null
    region_name: string | null
  }

  export type RegionMaxAggregateOutputType = {
    region_id: number | null
    region_name: string | null
  }

  export type RegionCountAggregateOutputType = {
    region_id: number
    region_name: number
    _all: number
  }


  export type RegionAvgAggregateInputType = {
    region_id?: true
  }

  export type RegionSumAggregateInputType = {
    region_id?: true
  }

  export type RegionMinAggregateInputType = {
    region_id?: true
    region_name?: true
  }

  export type RegionMaxAggregateInputType = {
    region_id?: true
    region_name?: true
  }

  export type RegionCountAggregateInputType = {
    region_id?: true
    region_name?: true
    _all?: true
  }

  export type RegionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Region to aggregate.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Regions
    **/
    _count?: true | RegionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegionMaxAggregateInputType
  }

  export type GetRegionAggregateType<T extends RegionAggregateArgs> = {
        [P in keyof T & keyof AggregateRegion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegion[P]>
      : GetScalarType<T[P], AggregateRegion[P]>
  }




  export type RegionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegionWhereInput
    orderBy?: RegionOrderByWithAggregationInput | RegionOrderByWithAggregationInput[]
    by: RegionScalarFieldEnum[] | RegionScalarFieldEnum
    having?: RegionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegionCountAggregateInputType | true
    _avg?: RegionAvgAggregateInputType
    _sum?: RegionSumAggregateInputType
    _min?: RegionMinAggregateInputType
    _max?: RegionMaxAggregateInputType
  }

  export type RegionGroupByOutputType = {
    region_id: number
    region_name: string
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  type GetRegionGroupByPayload<T extends RegionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegionGroupByOutputType[P]>
            : GetScalarType<T[P], RegionGroupByOutputType[P]>
        }
      >
    >


  export type RegionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    region_id?: boolean
    region_name?: boolean
    companies?: boolean | Region$companiesArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["region"]>

  export type RegionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    region_id?: boolean
    region_name?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    region_id?: boolean
    region_name?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectScalar = {
    region_id?: boolean
    region_name?: boolean
  }

  export type RegionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"region_id" | "region_name", ExtArgs["result"]["region"]>
  export type RegionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | Region$companiesArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RegionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RegionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RegionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Region"
    objects: {
      companies: Prisma.$CompanyRegionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      region_id: number
      region_name: string
    }, ExtArgs["result"]["region"]>
    composites: {}
  }

  type RegionGetPayload<S extends boolean | null | undefined | RegionDefaultArgs> = $Result.GetResult<Prisma.$RegionPayload, S>

  type RegionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegionCountAggregateInputType | true
    }

  export interface RegionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Region'], meta: { name: 'Region' } }
    /**
     * Find zero or one Region that matches the filter.
     * @param {RegionFindUniqueArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegionFindUniqueArgs>(args: SelectSubset<T, RegionFindUniqueArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Region that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegionFindUniqueOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegionFindUniqueOrThrowArgs>(args: SelectSubset<T, RegionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Region that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegionFindFirstArgs>(args?: SelectSubset<T, RegionFindFirstArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Region that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegionFindFirstOrThrowArgs>(args?: SelectSubset<T, RegionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Regions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Regions
     * const regions = await prisma.region.findMany()
     * 
     * // Get first 10 Regions
     * const regions = await prisma.region.findMany({ take: 10 })
     * 
     * // Only select the `region_id`
     * const regionWithRegion_idOnly = await prisma.region.findMany({ select: { region_id: true } })
     * 
     */
    findMany<T extends RegionFindManyArgs>(args?: SelectSubset<T, RegionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Region.
     * @param {RegionCreateArgs} args - Arguments to create a Region.
     * @example
     * // Create one Region
     * const Region = await prisma.region.create({
     *   data: {
     *     // ... data to create a Region
     *   }
     * })
     * 
     */
    create<T extends RegionCreateArgs>(args: SelectSubset<T, RegionCreateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Regions.
     * @param {RegionCreateManyArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegionCreateManyArgs>(args?: SelectSubset<T, RegionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Regions and returns the data saved in the database.
     * @param {RegionCreateManyAndReturnArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Regions and only return the `region_id`
     * const regionWithRegion_idOnly = await prisma.region.createManyAndReturn({
     *   select: { region_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegionCreateManyAndReturnArgs>(args?: SelectSubset<T, RegionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Region.
     * @param {RegionDeleteArgs} args - Arguments to delete one Region.
     * @example
     * // Delete one Region
     * const Region = await prisma.region.delete({
     *   where: {
     *     // ... filter to delete one Region
     *   }
     * })
     * 
     */
    delete<T extends RegionDeleteArgs>(args: SelectSubset<T, RegionDeleteArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Region.
     * @param {RegionUpdateArgs} args - Arguments to update one Region.
     * @example
     * // Update one Region
     * const region = await prisma.region.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegionUpdateArgs>(args: SelectSubset<T, RegionUpdateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Regions.
     * @param {RegionDeleteManyArgs} args - Arguments to filter Regions to delete.
     * @example
     * // Delete a few Regions
     * const { count } = await prisma.region.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegionDeleteManyArgs>(args?: SelectSubset<T, RegionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegionUpdateManyArgs>(args: SelectSubset<T, RegionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions and returns the data updated in the database.
     * @param {RegionUpdateManyAndReturnArgs} args - Arguments to update many Regions.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Regions and only return the `region_id`
     * const regionWithRegion_idOnly = await prisma.region.updateManyAndReturn({
     *   select: { region_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegionUpdateManyAndReturnArgs>(args: SelectSubset<T, RegionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Region.
     * @param {RegionUpsertArgs} args - Arguments to update or create a Region.
     * @example
     * // Update or create a Region
     * const region = await prisma.region.upsert({
     *   create: {
     *     // ... data to create a Region
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Region we want to update
     *   }
     * })
     */
    upsert<T extends RegionUpsertArgs>(args: SelectSubset<T, RegionUpsertArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionCountArgs} args - Arguments to filter Regions to count.
     * @example
     * // Count the number of Regions
     * const count = await prisma.region.count({
     *   where: {
     *     // ... the filter for the Regions we want to count
     *   }
     * })
    **/
    count<T extends RegionCountArgs>(
      args?: Subset<T, RegionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegionAggregateArgs>(args: Subset<T, RegionAggregateArgs>): Prisma.PrismaPromise<GetRegionAggregateType<T>>

    /**
     * Group by Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegionGroupByArgs['orderBy'] }
        : { orderBy?: RegionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Region model
   */
  readonly fields: RegionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Region.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    companies<T extends Region$companiesArgs<ExtArgs> = {}>(args?: Subset<T, Region$companiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyRegionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Region model
   */
  interface RegionFieldRefs {
    readonly region_id: FieldRef<"Region", 'Int'>
    readonly region_name: FieldRef<"Region", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Region findUnique
   */
  export type RegionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findUniqueOrThrow
   */
  export type RegionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findFirst
   */
  export type RegionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findFirstOrThrow
   */
  export type RegionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findMany
   */
  export type RegionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Regions to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region create
   */
  export type RegionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to create a Region.
     */
    data: XOR<RegionCreateInput, RegionUncheckedCreateInput>
  }

  /**
   * Region createMany
   */
  export type RegionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Region createManyAndReturn
   */
  export type RegionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Region update
   */
  export type RegionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to update a Region.
     */
    data: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
    /**
     * Choose, which Region to update.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region updateMany
   */
  export type RegionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to update.
     */
    limit?: number
  }

  /**
   * Region updateManyAndReturn
   */
  export type RegionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to update.
     */
    limit?: number
  }

  /**
   * Region upsert
   */
  export type RegionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The filter to search for the Region to update in case it exists.
     */
    where: RegionWhereUniqueInput
    /**
     * In case the Region found by the `where` argument doesn't exist, create a new Region with this data.
     */
    create: XOR<RegionCreateInput, RegionUncheckedCreateInput>
    /**
     * In case the Region was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
  }

  /**
   * Region delete
   */
  export type RegionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter which Region to delete.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region deleteMany
   */
  export type RegionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Regions to delete
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to delete.
     */
    limit?: number
  }

  /**
   * Region.companies
   */
  export type Region$companiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsInclude<ExtArgs> | null
    where?: CompanyRegionsWhereInput
    orderBy?: CompanyRegionsOrderByWithRelationInput | CompanyRegionsOrderByWithRelationInput[]
    cursor?: CompanyRegionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyRegionsScalarFieldEnum | CompanyRegionsScalarFieldEnum[]
  }

  /**
   * Region without action
   */
  export type RegionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
  }


  /**
   * Model CompanyRegions
   */

  export type AggregateCompanyRegions = {
    _count: CompanyRegionsCountAggregateOutputType | null
    _avg: CompanyRegionsAvgAggregateOutputType | null
    _sum: CompanyRegionsSumAggregateOutputType | null
    _min: CompanyRegionsMinAggregateOutputType | null
    _max: CompanyRegionsMaxAggregateOutputType | null
  }

  export type CompanyRegionsAvgAggregateOutputType = {
    company_id: number | null
    region_id: number | null
  }

  export type CompanyRegionsSumAggregateOutputType = {
    company_id: number | null
    region_id: number | null
  }

  export type CompanyRegionsMinAggregateOutputType = {
    company_id: number | null
    region_id: number | null
  }

  export type CompanyRegionsMaxAggregateOutputType = {
    company_id: number | null
    region_id: number | null
  }

  export type CompanyRegionsCountAggregateOutputType = {
    company_id: number
    region_id: number
    _all: number
  }


  export type CompanyRegionsAvgAggregateInputType = {
    company_id?: true
    region_id?: true
  }

  export type CompanyRegionsSumAggregateInputType = {
    company_id?: true
    region_id?: true
  }

  export type CompanyRegionsMinAggregateInputType = {
    company_id?: true
    region_id?: true
  }

  export type CompanyRegionsMaxAggregateInputType = {
    company_id?: true
    region_id?: true
  }

  export type CompanyRegionsCountAggregateInputType = {
    company_id?: true
    region_id?: true
    _all?: true
  }

  export type CompanyRegionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyRegions to aggregate.
     */
    where?: CompanyRegionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyRegions to fetch.
     */
    orderBy?: CompanyRegionsOrderByWithRelationInput | CompanyRegionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyRegionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyRegions
    **/
    _count?: true | CompanyRegionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyRegionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanyRegionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyRegionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyRegionsMaxAggregateInputType
  }

  export type GetCompanyRegionsAggregateType<T extends CompanyRegionsAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyRegions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyRegions[P]>
      : GetScalarType<T[P], AggregateCompanyRegions[P]>
  }




  export type CompanyRegionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyRegionsWhereInput
    orderBy?: CompanyRegionsOrderByWithAggregationInput | CompanyRegionsOrderByWithAggregationInput[]
    by: CompanyRegionsScalarFieldEnum[] | CompanyRegionsScalarFieldEnum
    having?: CompanyRegionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyRegionsCountAggregateInputType | true
    _avg?: CompanyRegionsAvgAggregateInputType
    _sum?: CompanyRegionsSumAggregateInputType
    _min?: CompanyRegionsMinAggregateInputType
    _max?: CompanyRegionsMaxAggregateInputType
  }

  export type CompanyRegionsGroupByOutputType = {
    company_id: number
    region_id: number
    _count: CompanyRegionsCountAggregateOutputType | null
    _avg: CompanyRegionsAvgAggregateOutputType | null
    _sum: CompanyRegionsSumAggregateOutputType | null
    _min: CompanyRegionsMinAggregateOutputType | null
    _max: CompanyRegionsMaxAggregateOutputType | null
  }

  type GetCompanyRegionsGroupByPayload<T extends CompanyRegionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyRegionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyRegionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyRegionsGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyRegionsGroupByOutputType[P]>
        }
      >
    >


  export type CompanyRegionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    company_id?: boolean
    region_id?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyRegions"]>

  export type CompanyRegionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    company_id?: boolean
    region_id?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyRegions"]>

  export type CompanyRegionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    company_id?: boolean
    region_id?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyRegions"]>

  export type CompanyRegionsSelectScalar = {
    company_id?: boolean
    region_id?: boolean
  }

  export type CompanyRegionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"company_id" | "region_id", ExtArgs["result"]["companyRegions"]>
  export type CompanyRegionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type CompanyRegionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type CompanyRegionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $CompanyRegionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanyRegions"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      region: Prisma.$RegionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      company_id: number
      region_id: number
    }, ExtArgs["result"]["companyRegions"]>
    composites: {}
  }

  type CompanyRegionsGetPayload<S extends boolean | null | undefined | CompanyRegionsDefaultArgs> = $Result.GetResult<Prisma.$CompanyRegionsPayload, S>

  type CompanyRegionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyRegionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyRegionsCountAggregateInputType | true
    }

  export interface CompanyRegionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanyRegions'], meta: { name: 'CompanyRegions' } }
    /**
     * Find zero or one CompanyRegions that matches the filter.
     * @param {CompanyRegionsFindUniqueArgs} args - Arguments to find a CompanyRegions
     * @example
     * // Get one CompanyRegions
     * const companyRegions = await prisma.companyRegions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyRegionsFindUniqueArgs>(args: SelectSubset<T, CompanyRegionsFindUniqueArgs<ExtArgs>>): Prisma__CompanyRegionsClient<$Result.GetResult<Prisma.$CompanyRegionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompanyRegions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyRegionsFindUniqueOrThrowArgs} args - Arguments to find a CompanyRegions
     * @example
     * // Get one CompanyRegions
     * const companyRegions = await prisma.companyRegions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyRegionsFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyRegionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyRegionsClient<$Result.GetResult<Prisma.$CompanyRegionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyRegions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRegionsFindFirstArgs} args - Arguments to find a CompanyRegions
     * @example
     * // Get one CompanyRegions
     * const companyRegions = await prisma.companyRegions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyRegionsFindFirstArgs>(args?: SelectSubset<T, CompanyRegionsFindFirstArgs<ExtArgs>>): Prisma__CompanyRegionsClient<$Result.GetResult<Prisma.$CompanyRegionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyRegions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRegionsFindFirstOrThrowArgs} args - Arguments to find a CompanyRegions
     * @example
     * // Get one CompanyRegions
     * const companyRegions = await prisma.companyRegions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyRegionsFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyRegionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyRegionsClient<$Result.GetResult<Prisma.$CompanyRegionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanyRegions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRegionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyRegions
     * const companyRegions = await prisma.companyRegions.findMany()
     * 
     * // Get first 10 CompanyRegions
     * const companyRegions = await prisma.companyRegions.findMany({ take: 10 })
     * 
     * // Only select the `company_id`
     * const companyRegionsWithCompany_idOnly = await prisma.companyRegions.findMany({ select: { company_id: true } })
     * 
     */
    findMany<T extends CompanyRegionsFindManyArgs>(args?: SelectSubset<T, CompanyRegionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyRegionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompanyRegions.
     * @param {CompanyRegionsCreateArgs} args - Arguments to create a CompanyRegions.
     * @example
     * // Create one CompanyRegions
     * const CompanyRegions = await prisma.companyRegions.create({
     *   data: {
     *     // ... data to create a CompanyRegions
     *   }
     * })
     * 
     */
    create<T extends CompanyRegionsCreateArgs>(args: SelectSubset<T, CompanyRegionsCreateArgs<ExtArgs>>): Prisma__CompanyRegionsClient<$Result.GetResult<Prisma.$CompanyRegionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompanyRegions.
     * @param {CompanyRegionsCreateManyArgs} args - Arguments to create many CompanyRegions.
     * @example
     * // Create many CompanyRegions
     * const companyRegions = await prisma.companyRegions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyRegionsCreateManyArgs>(args?: SelectSubset<T, CompanyRegionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompanyRegions and returns the data saved in the database.
     * @param {CompanyRegionsCreateManyAndReturnArgs} args - Arguments to create many CompanyRegions.
     * @example
     * // Create many CompanyRegions
     * const companyRegions = await prisma.companyRegions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompanyRegions and only return the `company_id`
     * const companyRegionsWithCompany_idOnly = await prisma.companyRegions.createManyAndReturn({
     *   select: { company_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyRegionsCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyRegionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyRegionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CompanyRegions.
     * @param {CompanyRegionsDeleteArgs} args - Arguments to delete one CompanyRegions.
     * @example
     * // Delete one CompanyRegions
     * const CompanyRegions = await prisma.companyRegions.delete({
     *   where: {
     *     // ... filter to delete one CompanyRegions
     *   }
     * })
     * 
     */
    delete<T extends CompanyRegionsDeleteArgs>(args: SelectSubset<T, CompanyRegionsDeleteArgs<ExtArgs>>): Prisma__CompanyRegionsClient<$Result.GetResult<Prisma.$CompanyRegionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompanyRegions.
     * @param {CompanyRegionsUpdateArgs} args - Arguments to update one CompanyRegions.
     * @example
     * // Update one CompanyRegions
     * const companyRegions = await prisma.companyRegions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyRegionsUpdateArgs>(args: SelectSubset<T, CompanyRegionsUpdateArgs<ExtArgs>>): Prisma__CompanyRegionsClient<$Result.GetResult<Prisma.$CompanyRegionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompanyRegions.
     * @param {CompanyRegionsDeleteManyArgs} args - Arguments to filter CompanyRegions to delete.
     * @example
     * // Delete a few CompanyRegions
     * const { count } = await prisma.companyRegions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyRegionsDeleteManyArgs>(args?: SelectSubset<T, CompanyRegionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRegionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyRegions
     * const companyRegions = await prisma.companyRegions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyRegionsUpdateManyArgs>(args: SelectSubset<T, CompanyRegionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyRegions and returns the data updated in the database.
     * @param {CompanyRegionsUpdateManyAndReturnArgs} args - Arguments to update many CompanyRegions.
     * @example
     * // Update many CompanyRegions
     * const companyRegions = await prisma.companyRegions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CompanyRegions and only return the `company_id`
     * const companyRegionsWithCompany_idOnly = await prisma.companyRegions.updateManyAndReturn({
     *   select: { company_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyRegionsUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyRegionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyRegionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CompanyRegions.
     * @param {CompanyRegionsUpsertArgs} args - Arguments to update or create a CompanyRegions.
     * @example
     * // Update or create a CompanyRegions
     * const companyRegions = await prisma.companyRegions.upsert({
     *   create: {
     *     // ... data to create a CompanyRegions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyRegions we want to update
     *   }
     * })
     */
    upsert<T extends CompanyRegionsUpsertArgs>(args: SelectSubset<T, CompanyRegionsUpsertArgs<ExtArgs>>): Prisma__CompanyRegionsClient<$Result.GetResult<Prisma.$CompanyRegionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompanyRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRegionsCountArgs} args - Arguments to filter CompanyRegions to count.
     * @example
     * // Count the number of CompanyRegions
     * const count = await prisma.companyRegions.count({
     *   where: {
     *     // ... the filter for the CompanyRegions we want to count
     *   }
     * })
    **/
    count<T extends CompanyRegionsCountArgs>(
      args?: Subset<T, CompanyRegionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyRegionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRegionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyRegionsAggregateArgs>(args: Subset<T, CompanyRegionsAggregateArgs>): Prisma.PrismaPromise<GetCompanyRegionsAggregateType<T>>

    /**
     * Group by CompanyRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRegionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyRegionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyRegionsGroupByArgs['orderBy'] }
        : { orderBy?: CompanyRegionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyRegionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyRegionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanyRegions model
   */
  readonly fields: CompanyRegionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyRegions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyRegionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    region<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanyRegions model
   */
  interface CompanyRegionsFieldRefs {
    readonly company_id: FieldRef<"CompanyRegions", 'Int'>
    readonly region_id: FieldRef<"CompanyRegions", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CompanyRegions findUnique
   */
  export type CompanyRegionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyRegions to fetch.
     */
    where: CompanyRegionsWhereUniqueInput
  }

  /**
   * CompanyRegions findUniqueOrThrow
   */
  export type CompanyRegionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyRegions to fetch.
     */
    where: CompanyRegionsWhereUniqueInput
  }

  /**
   * CompanyRegions findFirst
   */
  export type CompanyRegionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyRegions to fetch.
     */
    where?: CompanyRegionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyRegions to fetch.
     */
    orderBy?: CompanyRegionsOrderByWithRelationInput | CompanyRegionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyRegions.
     */
    cursor?: CompanyRegionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyRegions.
     */
    distinct?: CompanyRegionsScalarFieldEnum | CompanyRegionsScalarFieldEnum[]
  }

  /**
   * CompanyRegions findFirstOrThrow
   */
  export type CompanyRegionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyRegions to fetch.
     */
    where?: CompanyRegionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyRegions to fetch.
     */
    orderBy?: CompanyRegionsOrderByWithRelationInput | CompanyRegionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyRegions.
     */
    cursor?: CompanyRegionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyRegions.
     */
    distinct?: CompanyRegionsScalarFieldEnum | CompanyRegionsScalarFieldEnum[]
  }

  /**
   * CompanyRegions findMany
   */
  export type CompanyRegionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyRegions to fetch.
     */
    where?: CompanyRegionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyRegions to fetch.
     */
    orderBy?: CompanyRegionsOrderByWithRelationInput | CompanyRegionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyRegions.
     */
    cursor?: CompanyRegionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyRegions.
     */
    distinct?: CompanyRegionsScalarFieldEnum | CompanyRegionsScalarFieldEnum[]
  }

  /**
   * CompanyRegions create
   */
  export type CompanyRegionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsInclude<ExtArgs> | null
    /**
     * The data needed to create a CompanyRegions.
     */
    data: XOR<CompanyRegionsCreateInput, CompanyRegionsUncheckedCreateInput>
  }

  /**
   * CompanyRegions createMany
   */
  export type CompanyRegionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanyRegions.
     */
    data: CompanyRegionsCreateManyInput | CompanyRegionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanyRegions createManyAndReturn
   */
  export type CompanyRegionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * The data used to create many CompanyRegions.
     */
    data: CompanyRegionsCreateManyInput | CompanyRegionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyRegions update
   */
  export type CompanyRegionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsInclude<ExtArgs> | null
    /**
     * The data needed to update a CompanyRegions.
     */
    data: XOR<CompanyRegionsUpdateInput, CompanyRegionsUncheckedUpdateInput>
    /**
     * Choose, which CompanyRegions to update.
     */
    where: CompanyRegionsWhereUniqueInput
  }

  /**
   * CompanyRegions updateMany
   */
  export type CompanyRegionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanyRegions.
     */
    data: XOR<CompanyRegionsUpdateManyMutationInput, CompanyRegionsUncheckedUpdateManyInput>
    /**
     * Filter which CompanyRegions to update
     */
    where?: CompanyRegionsWhereInput
    /**
     * Limit how many CompanyRegions to update.
     */
    limit?: number
  }

  /**
   * CompanyRegions updateManyAndReturn
   */
  export type CompanyRegionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * The data used to update CompanyRegions.
     */
    data: XOR<CompanyRegionsUpdateManyMutationInput, CompanyRegionsUncheckedUpdateManyInput>
    /**
     * Filter which CompanyRegions to update
     */
    where?: CompanyRegionsWhereInput
    /**
     * Limit how many CompanyRegions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyRegions upsert
   */
  export type CompanyRegionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsInclude<ExtArgs> | null
    /**
     * The filter to search for the CompanyRegions to update in case it exists.
     */
    where: CompanyRegionsWhereUniqueInput
    /**
     * In case the CompanyRegions found by the `where` argument doesn't exist, create a new CompanyRegions with this data.
     */
    create: XOR<CompanyRegionsCreateInput, CompanyRegionsUncheckedCreateInput>
    /**
     * In case the CompanyRegions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyRegionsUpdateInput, CompanyRegionsUncheckedUpdateInput>
  }

  /**
   * CompanyRegions delete
   */
  export type CompanyRegionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsInclude<ExtArgs> | null
    /**
     * Filter which CompanyRegions to delete.
     */
    where: CompanyRegionsWhereUniqueInput
  }

  /**
   * CompanyRegions deleteMany
   */
  export type CompanyRegionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyRegions to delete
     */
    where?: CompanyRegionsWhereInput
    /**
     * Limit how many CompanyRegions to delete.
     */
    limit?: number
  }

  /**
   * CompanyRegions without action
   */
  export type CompanyRegionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyRegions
     */
    select?: CompanyRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyRegions
     */
    omit?: CompanyRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyRegionsInclude<ExtArgs> | null
  }


  /**
   * Model CompanyTargets
   */

  export type AggregateCompanyTargets = {
    _count: CompanyTargetsCountAggregateOutputType | null
    _avg: CompanyTargetsAvgAggregateOutputType | null
    _sum: CompanyTargetsSumAggregateOutputType | null
    _min: CompanyTargetsMinAggregateOutputType | null
    _max: CompanyTargetsMaxAggregateOutputType | null
  }

  export type CompanyTargetsAvgAggregateOutputType = {
    source_company_id: number | null
    target_company_id: number | null
  }

  export type CompanyTargetsSumAggregateOutputType = {
    source_company_id: number | null
    target_company_id: number | null
  }

  export type CompanyTargetsMinAggregateOutputType = {
    source_company_id: number | null
    target_company_id: number | null
    status: string | null
    notes: string | null
    created_at: Date | null
  }

  export type CompanyTargetsMaxAggregateOutputType = {
    source_company_id: number | null
    target_company_id: number | null
    status: string | null
    notes: string | null
    created_at: Date | null
  }

  export type CompanyTargetsCountAggregateOutputType = {
    source_company_id: number
    target_company_id: number
    status: number
    notes: number
    created_at: number
    _all: number
  }


  export type CompanyTargetsAvgAggregateInputType = {
    source_company_id?: true
    target_company_id?: true
  }

  export type CompanyTargetsSumAggregateInputType = {
    source_company_id?: true
    target_company_id?: true
  }

  export type CompanyTargetsMinAggregateInputType = {
    source_company_id?: true
    target_company_id?: true
    status?: true
    notes?: true
    created_at?: true
  }

  export type CompanyTargetsMaxAggregateInputType = {
    source_company_id?: true
    target_company_id?: true
    status?: true
    notes?: true
    created_at?: true
  }

  export type CompanyTargetsCountAggregateInputType = {
    source_company_id?: true
    target_company_id?: true
    status?: true
    notes?: true
    created_at?: true
    _all?: true
  }

  export type CompanyTargetsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyTargets to aggregate.
     */
    where?: CompanyTargetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyTargets to fetch.
     */
    orderBy?: CompanyTargetsOrderByWithRelationInput | CompanyTargetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyTargetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyTargets
    **/
    _count?: true | CompanyTargetsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyTargetsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanyTargetsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyTargetsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyTargetsMaxAggregateInputType
  }

  export type GetCompanyTargetsAggregateType<T extends CompanyTargetsAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyTargets]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyTargets[P]>
      : GetScalarType<T[P], AggregateCompanyTargets[P]>
  }




  export type CompanyTargetsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyTargetsWhereInput
    orderBy?: CompanyTargetsOrderByWithAggregationInput | CompanyTargetsOrderByWithAggregationInput[]
    by: CompanyTargetsScalarFieldEnum[] | CompanyTargetsScalarFieldEnum
    having?: CompanyTargetsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyTargetsCountAggregateInputType | true
    _avg?: CompanyTargetsAvgAggregateInputType
    _sum?: CompanyTargetsSumAggregateInputType
    _min?: CompanyTargetsMinAggregateInputType
    _max?: CompanyTargetsMaxAggregateInputType
  }

  export type CompanyTargetsGroupByOutputType = {
    source_company_id: number
    target_company_id: number
    status: string | null
    notes: string | null
    created_at: Date
    _count: CompanyTargetsCountAggregateOutputType | null
    _avg: CompanyTargetsAvgAggregateOutputType | null
    _sum: CompanyTargetsSumAggregateOutputType | null
    _min: CompanyTargetsMinAggregateOutputType | null
    _max: CompanyTargetsMaxAggregateOutputType | null
  }

  type GetCompanyTargetsGroupByPayload<T extends CompanyTargetsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyTargetsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyTargetsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyTargetsGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyTargetsGroupByOutputType[P]>
        }
      >
    >


  export type CompanyTargetsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    source_company_id?: boolean
    target_company_id?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
    source?: boolean | CompanyDefaultArgs<ExtArgs>
    target?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyTargets"]>

  export type CompanyTargetsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    source_company_id?: boolean
    target_company_id?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
    source?: boolean | CompanyDefaultArgs<ExtArgs>
    target?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyTargets"]>

  export type CompanyTargetsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    source_company_id?: boolean
    target_company_id?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
    source?: boolean | CompanyDefaultArgs<ExtArgs>
    target?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyTargets"]>

  export type CompanyTargetsSelectScalar = {
    source_company_id?: boolean
    target_company_id?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
  }

  export type CompanyTargetsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"source_company_id" | "target_company_id" | "status" | "notes" | "created_at", ExtArgs["result"]["companyTargets"]>
  export type CompanyTargetsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | CompanyDefaultArgs<ExtArgs>
    target?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type CompanyTargetsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | CompanyDefaultArgs<ExtArgs>
    target?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type CompanyTargetsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | CompanyDefaultArgs<ExtArgs>
    target?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $CompanyTargetsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanyTargets"
    objects: {
      source: Prisma.$CompanyPayload<ExtArgs>
      target: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      source_company_id: number
      target_company_id: number
      status: string | null
      notes: string | null
      created_at: Date
    }, ExtArgs["result"]["companyTargets"]>
    composites: {}
  }

  type CompanyTargetsGetPayload<S extends boolean | null | undefined | CompanyTargetsDefaultArgs> = $Result.GetResult<Prisma.$CompanyTargetsPayload, S>

  type CompanyTargetsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyTargetsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyTargetsCountAggregateInputType | true
    }

  export interface CompanyTargetsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanyTargets'], meta: { name: 'CompanyTargets' } }
    /**
     * Find zero or one CompanyTargets that matches the filter.
     * @param {CompanyTargetsFindUniqueArgs} args - Arguments to find a CompanyTargets
     * @example
     * // Get one CompanyTargets
     * const companyTargets = await prisma.companyTargets.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyTargetsFindUniqueArgs>(args: SelectSubset<T, CompanyTargetsFindUniqueArgs<ExtArgs>>): Prisma__CompanyTargetsClient<$Result.GetResult<Prisma.$CompanyTargetsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompanyTargets that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyTargetsFindUniqueOrThrowArgs} args - Arguments to find a CompanyTargets
     * @example
     * // Get one CompanyTargets
     * const companyTargets = await prisma.companyTargets.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyTargetsFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyTargetsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyTargetsClient<$Result.GetResult<Prisma.$CompanyTargetsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyTargets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyTargetsFindFirstArgs} args - Arguments to find a CompanyTargets
     * @example
     * // Get one CompanyTargets
     * const companyTargets = await prisma.companyTargets.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyTargetsFindFirstArgs>(args?: SelectSubset<T, CompanyTargetsFindFirstArgs<ExtArgs>>): Prisma__CompanyTargetsClient<$Result.GetResult<Prisma.$CompanyTargetsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyTargets that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyTargetsFindFirstOrThrowArgs} args - Arguments to find a CompanyTargets
     * @example
     * // Get one CompanyTargets
     * const companyTargets = await prisma.companyTargets.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyTargetsFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyTargetsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyTargetsClient<$Result.GetResult<Prisma.$CompanyTargetsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanyTargets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyTargetsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyTargets
     * const companyTargets = await prisma.companyTargets.findMany()
     * 
     * // Get first 10 CompanyTargets
     * const companyTargets = await prisma.companyTargets.findMany({ take: 10 })
     * 
     * // Only select the `source_company_id`
     * const companyTargetsWithSource_company_idOnly = await prisma.companyTargets.findMany({ select: { source_company_id: true } })
     * 
     */
    findMany<T extends CompanyTargetsFindManyArgs>(args?: SelectSubset<T, CompanyTargetsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyTargetsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompanyTargets.
     * @param {CompanyTargetsCreateArgs} args - Arguments to create a CompanyTargets.
     * @example
     * // Create one CompanyTargets
     * const CompanyTargets = await prisma.companyTargets.create({
     *   data: {
     *     // ... data to create a CompanyTargets
     *   }
     * })
     * 
     */
    create<T extends CompanyTargetsCreateArgs>(args: SelectSubset<T, CompanyTargetsCreateArgs<ExtArgs>>): Prisma__CompanyTargetsClient<$Result.GetResult<Prisma.$CompanyTargetsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompanyTargets.
     * @param {CompanyTargetsCreateManyArgs} args - Arguments to create many CompanyTargets.
     * @example
     * // Create many CompanyTargets
     * const companyTargets = await prisma.companyTargets.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyTargetsCreateManyArgs>(args?: SelectSubset<T, CompanyTargetsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompanyTargets and returns the data saved in the database.
     * @param {CompanyTargetsCreateManyAndReturnArgs} args - Arguments to create many CompanyTargets.
     * @example
     * // Create many CompanyTargets
     * const companyTargets = await prisma.companyTargets.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompanyTargets and only return the `source_company_id`
     * const companyTargetsWithSource_company_idOnly = await prisma.companyTargets.createManyAndReturn({
     *   select: { source_company_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyTargetsCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyTargetsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyTargetsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CompanyTargets.
     * @param {CompanyTargetsDeleteArgs} args - Arguments to delete one CompanyTargets.
     * @example
     * // Delete one CompanyTargets
     * const CompanyTargets = await prisma.companyTargets.delete({
     *   where: {
     *     // ... filter to delete one CompanyTargets
     *   }
     * })
     * 
     */
    delete<T extends CompanyTargetsDeleteArgs>(args: SelectSubset<T, CompanyTargetsDeleteArgs<ExtArgs>>): Prisma__CompanyTargetsClient<$Result.GetResult<Prisma.$CompanyTargetsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompanyTargets.
     * @param {CompanyTargetsUpdateArgs} args - Arguments to update one CompanyTargets.
     * @example
     * // Update one CompanyTargets
     * const companyTargets = await prisma.companyTargets.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyTargetsUpdateArgs>(args: SelectSubset<T, CompanyTargetsUpdateArgs<ExtArgs>>): Prisma__CompanyTargetsClient<$Result.GetResult<Prisma.$CompanyTargetsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompanyTargets.
     * @param {CompanyTargetsDeleteManyArgs} args - Arguments to filter CompanyTargets to delete.
     * @example
     * // Delete a few CompanyTargets
     * const { count } = await prisma.companyTargets.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyTargetsDeleteManyArgs>(args?: SelectSubset<T, CompanyTargetsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyTargetsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyTargets
     * const companyTargets = await prisma.companyTargets.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyTargetsUpdateManyArgs>(args: SelectSubset<T, CompanyTargetsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyTargets and returns the data updated in the database.
     * @param {CompanyTargetsUpdateManyAndReturnArgs} args - Arguments to update many CompanyTargets.
     * @example
     * // Update many CompanyTargets
     * const companyTargets = await prisma.companyTargets.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CompanyTargets and only return the `source_company_id`
     * const companyTargetsWithSource_company_idOnly = await prisma.companyTargets.updateManyAndReturn({
     *   select: { source_company_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyTargetsUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyTargetsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyTargetsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CompanyTargets.
     * @param {CompanyTargetsUpsertArgs} args - Arguments to update or create a CompanyTargets.
     * @example
     * // Update or create a CompanyTargets
     * const companyTargets = await prisma.companyTargets.upsert({
     *   create: {
     *     // ... data to create a CompanyTargets
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyTargets we want to update
     *   }
     * })
     */
    upsert<T extends CompanyTargetsUpsertArgs>(args: SelectSubset<T, CompanyTargetsUpsertArgs<ExtArgs>>): Prisma__CompanyTargetsClient<$Result.GetResult<Prisma.$CompanyTargetsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompanyTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyTargetsCountArgs} args - Arguments to filter CompanyTargets to count.
     * @example
     * // Count the number of CompanyTargets
     * const count = await prisma.companyTargets.count({
     *   where: {
     *     // ... the filter for the CompanyTargets we want to count
     *   }
     * })
    **/
    count<T extends CompanyTargetsCountArgs>(
      args?: Subset<T, CompanyTargetsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyTargetsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyTargetsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyTargetsAggregateArgs>(args: Subset<T, CompanyTargetsAggregateArgs>): Prisma.PrismaPromise<GetCompanyTargetsAggregateType<T>>

    /**
     * Group by CompanyTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyTargetsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyTargetsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyTargetsGroupByArgs['orderBy'] }
        : { orderBy?: CompanyTargetsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyTargetsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyTargetsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanyTargets model
   */
  readonly fields: CompanyTargetsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyTargets.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyTargetsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    source<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    target<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanyTargets model
   */
  interface CompanyTargetsFieldRefs {
    readonly source_company_id: FieldRef<"CompanyTargets", 'Int'>
    readonly target_company_id: FieldRef<"CompanyTargets", 'Int'>
    readonly status: FieldRef<"CompanyTargets", 'String'>
    readonly notes: FieldRef<"CompanyTargets", 'String'>
    readonly created_at: FieldRef<"CompanyTargets", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CompanyTargets findUnique
   */
  export type CompanyTargetsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyTargets to fetch.
     */
    where: CompanyTargetsWhereUniqueInput
  }

  /**
   * CompanyTargets findUniqueOrThrow
   */
  export type CompanyTargetsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyTargets to fetch.
     */
    where: CompanyTargetsWhereUniqueInput
  }

  /**
   * CompanyTargets findFirst
   */
  export type CompanyTargetsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyTargets to fetch.
     */
    where?: CompanyTargetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyTargets to fetch.
     */
    orderBy?: CompanyTargetsOrderByWithRelationInput | CompanyTargetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyTargets.
     */
    cursor?: CompanyTargetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyTargets.
     */
    distinct?: CompanyTargetsScalarFieldEnum | CompanyTargetsScalarFieldEnum[]
  }

  /**
   * CompanyTargets findFirstOrThrow
   */
  export type CompanyTargetsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyTargets to fetch.
     */
    where?: CompanyTargetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyTargets to fetch.
     */
    orderBy?: CompanyTargetsOrderByWithRelationInput | CompanyTargetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyTargets.
     */
    cursor?: CompanyTargetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyTargets.
     */
    distinct?: CompanyTargetsScalarFieldEnum | CompanyTargetsScalarFieldEnum[]
  }

  /**
   * CompanyTargets findMany
   */
  export type CompanyTargetsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsInclude<ExtArgs> | null
    /**
     * Filter, which CompanyTargets to fetch.
     */
    where?: CompanyTargetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyTargets to fetch.
     */
    orderBy?: CompanyTargetsOrderByWithRelationInput | CompanyTargetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyTargets.
     */
    cursor?: CompanyTargetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyTargets.
     */
    distinct?: CompanyTargetsScalarFieldEnum | CompanyTargetsScalarFieldEnum[]
  }

  /**
   * CompanyTargets create
   */
  export type CompanyTargetsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsInclude<ExtArgs> | null
    /**
     * The data needed to create a CompanyTargets.
     */
    data: XOR<CompanyTargetsCreateInput, CompanyTargetsUncheckedCreateInput>
  }

  /**
   * CompanyTargets createMany
   */
  export type CompanyTargetsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanyTargets.
     */
    data: CompanyTargetsCreateManyInput | CompanyTargetsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanyTargets createManyAndReturn
   */
  export type CompanyTargetsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * The data used to create many CompanyTargets.
     */
    data: CompanyTargetsCreateManyInput | CompanyTargetsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyTargets update
   */
  export type CompanyTargetsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsInclude<ExtArgs> | null
    /**
     * The data needed to update a CompanyTargets.
     */
    data: XOR<CompanyTargetsUpdateInput, CompanyTargetsUncheckedUpdateInput>
    /**
     * Choose, which CompanyTargets to update.
     */
    where: CompanyTargetsWhereUniqueInput
  }

  /**
   * CompanyTargets updateMany
   */
  export type CompanyTargetsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanyTargets.
     */
    data: XOR<CompanyTargetsUpdateManyMutationInput, CompanyTargetsUncheckedUpdateManyInput>
    /**
     * Filter which CompanyTargets to update
     */
    where?: CompanyTargetsWhereInput
    /**
     * Limit how many CompanyTargets to update.
     */
    limit?: number
  }

  /**
   * CompanyTargets updateManyAndReturn
   */
  export type CompanyTargetsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * The data used to update CompanyTargets.
     */
    data: XOR<CompanyTargetsUpdateManyMutationInput, CompanyTargetsUncheckedUpdateManyInput>
    /**
     * Filter which CompanyTargets to update
     */
    where?: CompanyTargetsWhereInput
    /**
     * Limit how many CompanyTargets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyTargets upsert
   */
  export type CompanyTargetsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsInclude<ExtArgs> | null
    /**
     * The filter to search for the CompanyTargets to update in case it exists.
     */
    where: CompanyTargetsWhereUniqueInput
    /**
     * In case the CompanyTargets found by the `where` argument doesn't exist, create a new CompanyTargets with this data.
     */
    create: XOR<CompanyTargetsCreateInput, CompanyTargetsUncheckedCreateInput>
    /**
     * In case the CompanyTargets was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyTargetsUpdateInput, CompanyTargetsUncheckedUpdateInput>
  }

  /**
   * CompanyTargets delete
   */
  export type CompanyTargetsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsInclude<ExtArgs> | null
    /**
     * Filter which CompanyTargets to delete.
     */
    where: CompanyTargetsWhereUniqueInput
  }

  /**
   * CompanyTargets deleteMany
   */
  export type CompanyTargetsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyTargets to delete
     */
    where?: CompanyTargetsWhereInput
    /**
     * Limit how many CompanyTargets to delete.
     */
    limit?: number
  }

  /**
   * CompanyTargets without action
   */
  export type CompanyTargetsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyTargets
     */
    select?: CompanyTargetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyTargets
     */
    omit?: CompanyTargetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyTargetsInclude<ExtArgs> | null
  }


  /**
   * Model CompanyMatches
   */

  export type AggregateCompanyMatches = {
    _count: CompanyMatchesCountAggregateOutputType | null
    _avg: CompanyMatchesAvgAggregateOutputType | null
    _sum: CompanyMatchesSumAggregateOutputType | null
    _min: CompanyMatchesMinAggregateOutputType | null
    _max: CompanyMatchesMaxAggregateOutputType | null
  }

  export type CompanyMatchesAvgAggregateOutputType = {
    company1_id: number | null
    company2_id: number | null
  }

  export type CompanyMatchesSumAggregateOutputType = {
    company1_id: number | null
    company2_id: number | null
  }

  export type CompanyMatchesMinAggregateOutputType = {
    company1_id: number | null
    company2_id: number | null
    matched_at: Date | null
    match_type: string | null
  }

  export type CompanyMatchesMaxAggregateOutputType = {
    company1_id: number | null
    company2_id: number | null
    matched_at: Date | null
    match_type: string | null
  }

  export type CompanyMatchesCountAggregateOutputType = {
    company1_id: number
    company2_id: number
    matched_at: number
    match_type: number
    _all: number
  }


  export type CompanyMatchesAvgAggregateInputType = {
    company1_id?: true
    company2_id?: true
  }

  export type CompanyMatchesSumAggregateInputType = {
    company1_id?: true
    company2_id?: true
  }

  export type CompanyMatchesMinAggregateInputType = {
    company1_id?: true
    company2_id?: true
    matched_at?: true
    match_type?: true
  }

  export type CompanyMatchesMaxAggregateInputType = {
    company1_id?: true
    company2_id?: true
    matched_at?: true
    match_type?: true
  }

  export type CompanyMatchesCountAggregateInputType = {
    company1_id?: true
    company2_id?: true
    matched_at?: true
    match_type?: true
    _all?: true
  }

  export type CompanyMatchesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyMatches to aggregate.
     */
    where?: CompanyMatchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyMatches to fetch.
     */
    orderBy?: CompanyMatchesOrderByWithRelationInput | CompanyMatchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyMatchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyMatches
    **/
    _count?: true | CompanyMatchesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyMatchesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanyMatchesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMatchesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMatchesMaxAggregateInputType
  }

  export type GetCompanyMatchesAggregateType<T extends CompanyMatchesAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyMatches]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyMatches[P]>
      : GetScalarType<T[P], AggregateCompanyMatches[P]>
  }




  export type CompanyMatchesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyMatchesWhereInput
    orderBy?: CompanyMatchesOrderByWithAggregationInput | CompanyMatchesOrderByWithAggregationInput[]
    by: CompanyMatchesScalarFieldEnum[] | CompanyMatchesScalarFieldEnum
    having?: CompanyMatchesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyMatchesCountAggregateInputType | true
    _avg?: CompanyMatchesAvgAggregateInputType
    _sum?: CompanyMatchesSumAggregateInputType
    _min?: CompanyMatchesMinAggregateInputType
    _max?: CompanyMatchesMaxAggregateInputType
  }

  export type CompanyMatchesGroupByOutputType = {
    company1_id: number
    company2_id: number
    matched_at: Date
    match_type: string | null
    _count: CompanyMatchesCountAggregateOutputType | null
    _avg: CompanyMatchesAvgAggregateOutputType | null
    _sum: CompanyMatchesSumAggregateOutputType | null
    _min: CompanyMatchesMinAggregateOutputType | null
    _max: CompanyMatchesMaxAggregateOutputType | null
  }

  type GetCompanyMatchesGroupByPayload<T extends CompanyMatchesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyMatchesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyMatchesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyMatchesGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyMatchesGroupByOutputType[P]>
        }
      >
    >


  export type CompanyMatchesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    company1_id?: boolean
    company2_id?: boolean
    matched_at?: boolean
    match_type?: boolean
    company1?: boolean | CompanyDefaultArgs<ExtArgs>
    company2?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyMatches"]>

  export type CompanyMatchesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    company1_id?: boolean
    company2_id?: boolean
    matched_at?: boolean
    match_type?: boolean
    company1?: boolean | CompanyDefaultArgs<ExtArgs>
    company2?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyMatches"]>

  export type CompanyMatchesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    company1_id?: boolean
    company2_id?: boolean
    matched_at?: boolean
    match_type?: boolean
    company1?: boolean | CompanyDefaultArgs<ExtArgs>
    company2?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyMatches"]>

  export type CompanyMatchesSelectScalar = {
    company1_id?: boolean
    company2_id?: boolean
    matched_at?: boolean
    match_type?: boolean
  }

  export type CompanyMatchesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"company1_id" | "company2_id" | "matched_at" | "match_type", ExtArgs["result"]["companyMatches"]>
  export type CompanyMatchesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company1?: boolean | CompanyDefaultArgs<ExtArgs>
    company2?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type CompanyMatchesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company1?: boolean | CompanyDefaultArgs<ExtArgs>
    company2?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type CompanyMatchesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company1?: boolean | CompanyDefaultArgs<ExtArgs>
    company2?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $CompanyMatchesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanyMatches"
    objects: {
      company1: Prisma.$CompanyPayload<ExtArgs>
      company2: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      company1_id: number
      company2_id: number
      matched_at: Date
      match_type: string | null
    }, ExtArgs["result"]["companyMatches"]>
    composites: {}
  }

  type CompanyMatchesGetPayload<S extends boolean | null | undefined | CompanyMatchesDefaultArgs> = $Result.GetResult<Prisma.$CompanyMatchesPayload, S>

  type CompanyMatchesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyMatchesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyMatchesCountAggregateInputType | true
    }

  export interface CompanyMatchesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanyMatches'], meta: { name: 'CompanyMatches' } }
    /**
     * Find zero or one CompanyMatches that matches the filter.
     * @param {CompanyMatchesFindUniqueArgs} args - Arguments to find a CompanyMatches
     * @example
     * // Get one CompanyMatches
     * const companyMatches = await prisma.companyMatches.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyMatchesFindUniqueArgs>(args: SelectSubset<T, CompanyMatchesFindUniqueArgs<ExtArgs>>): Prisma__CompanyMatchesClient<$Result.GetResult<Prisma.$CompanyMatchesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompanyMatches that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyMatchesFindUniqueOrThrowArgs} args - Arguments to find a CompanyMatches
     * @example
     * // Get one CompanyMatches
     * const companyMatches = await prisma.companyMatches.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyMatchesFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyMatchesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyMatchesClient<$Result.GetResult<Prisma.$CompanyMatchesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyMatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyMatchesFindFirstArgs} args - Arguments to find a CompanyMatches
     * @example
     * // Get one CompanyMatches
     * const companyMatches = await prisma.companyMatches.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyMatchesFindFirstArgs>(args?: SelectSubset<T, CompanyMatchesFindFirstArgs<ExtArgs>>): Prisma__CompanyMatchesClient<$Result.GetResult<Prisma.$CompanyMatchesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyMatches that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyMatchesFindFirstOrThrowArgs} args - Arguments to find a CompanyMatches
     * @example
     * // Get one CompanyMatches
     * const companyMatches = await prisma.companyMatches.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyMatchesFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyMatchesFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyMatchesClient<$Result.GetResult<Prisma.$CompanyMatchesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanyMatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyMatchesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyMatches
     * const companyMatches = await prisma.companyMatches.findMany()
     * 
     * // Get first 10 CompanyMatches
     * const companyMatches = await prisma.companyMatches.findMany({ take: 10 })
     * 
     * // Only select the `company1_id`
     * const companyMatchesWithCompany1_idOnly = await prisma.companyMatches.findMany({ select: { company1_id: true } })
     * 
     */
    findMany<T extends CompanyMatchesFindManyArgs>(args?: SelectSubset<T, CompanyMatchesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyMatchesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompanyMatches.
     * @param {CompanyMatchesCreateArgs} args - Arguments to create a CompanyMatches.
     * @example
     * // Create one CompanyMatches
     * const CompanyMatches = await prisma.companyMatches.create({
     *   data: {
     *     // ... data to create a CompanyMatches
     *   }
     * })
     * 
     */
    create<T extends CompanyMatchesCreateArgs>(args: SelectSubset<T, CompanyMatchesCreateArgs<ExtArgs>>): Prisma__CompanyMatchesClient<$Result.GetResult<Prisma.$CompanyMatchesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompanyMatches.
     * @param {CompanyMatchesCreateManyArgs} args - Arguments to create many CompanyMatches.
     * @example
     * // Create many CompanyMatches
     * const companyMatches = await prisma.companyMatches.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyMatchesCreateManyArgs>(args?: SelectSubset<T, CompanyMatchesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompanyMatches and returns the data saved in the database.
     * @param {CompanyMatchesCreateManyAndReturnArgs} args - Arguments to create many CompanyMatches.
     * @example
     * // Create many CompanyMatches
     * const companyMatches = await prisma.companyMatches.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompanyMatches and only return the `company1_id`
     * const companyMatchesWithCompany1_idOnly = await prisma.companyMatches.createManyAndReturn({
     *   select: { company1_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyMatchesCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyMatchesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyMatchesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CompanyMatches.
     * @param {CompanyMatchesDeleteArgs} args - Arguments to delete one CompanyMatches.
     * @example
     * // Delete one CompanyMatches
     * const CompanyMatches = await prisma.companyMatches.delete({
     *   where: {
     *     // ... filter to delete one CompanyMatches
     *   }
     * })
     * 
     */
    delete<T extends CompanyMatchesDeleteArgs>(args: SelectSubset<T, CompanyMatchesDeleteArgs<ExtArgs>>): Prisma__CompanyMatchesClient<$Result.GetResult<Prisma.$CompanyMatchesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompanyMatches.
     * @param {CompanyMatchesUpdateArgs} args - Arguments to update one CompanyMatches.
     * @example
     * // Update one CompanyMatches
     * const companyMatches = await prisma.companyMatches.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyMatchesUpdateArgs>(args: SelectSubset<T, CompanyMatchesUpdateArgs<ExtArgs>>): Prisma__CompanyMatchesClient<$Result.GetResult<Prisma.$CompanyMatchesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompanyMatches.
     * @param {CompanyMatchesDeleteManyArgs} args - Arguments to filter CompanyMatches to delete.
     * @example
     * // Delete a few CompanyMatches
     * const { count } = await prisma.companyMatches.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyMatchesDeleteManyArgs>(args?: SelectSubset<T, CompanyMatchesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyMatchesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyMatches
     * const companyMatches = await prisma.companyMatches.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyMatchesUpdateManyArgs>(args: SelectSubset<T, CompanyMatchesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyMatches and returns the data updated in the database.
     * @param {CompanyMatchesUpdateManyAndReturnArgs} args - Arguments to update many CompanyMatches.
     * @example
     * // Update many CompanyMatches
     * const companyMatches = await prisma.companyMatches.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CompanyMatches and only return the `company1_id`
     * const companyMatchesWithCompany1_idOnly = await prisma.companyMatches.updateManyAndReturn({
     *   select: { company1_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyMatchesUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyMatchesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyMatchesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CompanyMatches.
     * @param {CompanyMatchesUpsertArgs} args - Arguments to update or create a CompanyMatches.
     * @example
     * // Update or create a CompanyMatches
     * const companyMatches = await prisma.companyMatches.upsert({
     *   create: {
     *     // ... data to create a CompanyMatches
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyMatches we want to update
     *   }
     * })
     */
    upsert<T extends CompanyMatchesUpsertArgs>(args: SelectSubset<T, CompanyMatchesUpsertArgs<ExtArgs>>): Prisma__CompanyMatchesClient<$Result.GetResult<Prisma.$CompanyMatchesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompanyMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyMatchesCountArgs} args - Arguments to filter CompanyMatches to count.
     * @example
     * // Count the number of CompanyMatches
     * const count = await prisma.companyMatches.count({
     *   where: {
     *     // ... the filter for the CompanyMatches we want to count
     *   }
     * })
    **/
    count<T extends CompanyMatchesCountArgs>(
      args?: Subset<T, CompanyMatchesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyMatchesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyMatchesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyMatchesAggregateArgs>(args: Subset<T, CompanyMatchesAggregateArgs>): Prisma.PrismaPromise<GetCompanyMatchesAggregateType<T>>

    /**
     * Group by CompanyMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyMatchesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyMatchesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyMatchesGroupByArgs['orderBy'] }
        : { orderBy?: CompanyMatchesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyMatchesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyMatchesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanyMatches model
   */
  readonly fields: CompanyMatchesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyMatches.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyMatchesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company1<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    company2<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanyMatches model
   */
  interface CompanyMatchesFieldRefs {
    readonly company1_id: FieldRef<"CompanyMatches", 'Int'>
    readonly company2_id: FieldRef<"CompanyMatches", 'Int'>
    readonly matched_at: FieldRef<"CompanyMatches", 'DateTime'>
    readonly match_type: FieldRef<"CompanyMatches", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CompanyMatches findUnique
   */
  export type CompanyMatchesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesInclude<ExtArgs> | null
    /**
     * Filter, which CompanyMatches to fetch.
     */
    where: CompanyMatchesWhereUniqueInput
  }

  /**
   * CompanyMatches findUniqueOrThrow
   */
  export type CompanyMatchesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesInclude<ExtArgs> | null
    /**
     * Filter, which CompanyMatches to fetch.
     */
    where: CompanyMatchesWhereUniqueInput
  }

  /**
   * CompanyMatches findFirst
   */
  export type CompanyMatchesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesInclude<ExtArgs> | null
    /**
     * Filter, which CompanyMatches to fetch.
     */
    where?: CompanyMatchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyMatches to fetch.
     */
    orderBy?: CompanyMatchesOrderByWithRelationInput | CompanyMatchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyMatches.
     */
    cursor?: CompanyMatchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyMatches.
     */
    distinct?: CompanyMatchesScalarFieldEnum | CompanyMatchesScalarFieldEnum[]
  }

  /**
   * CompanyMatches findFirstOrThrow
   */
  export type CompanyMatchesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesInclude<ExtArgs> | null
    /**
     * Filter, which CompanyMatches to fetch.
     */
    where?: CompanyMatchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyMatches to fetch.
     */
    orderBy?: CompanyMatchesOrderByWithRelationInput | CompanyMatchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyMatches.
     */
    cursor?: CompanyMatchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyMatches.
     */
    distinct?: CompanyMatchesScalarFieldEnum | CompanyMatchesScalarFieldEnum[]
  }

  /**
   * CompanyMatches findMany
   */
  export type CompanyMatchesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesInclude<ExtArgs> | null
    /**
     * Filter, which CompanyMatches to fetch.
     */
    where?: CompanyMatchesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyMatches to fetch.
     */
    orderBy?: CompanyMatchesOrderByWithRelationInput | CompanyMatchesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyMatches.
     */
    cursor?: CompanyMatchesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyMatches.
     */
    distinct?: CompanyMatchesScalarFieldEnum | CompanyMatchesScalarFieldEnum[]
  }

  /**
   * CompanyMatches create
   */
  export type CompanyMatchesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesInclude<ExtArgs> | null
    /**
     * The data needed to create a CompanyMatches.
     */
    data: XOR<CompanyMatchesCreateInput, CompanyMatchesUncheckedCreateInput>
  }

  /**
   * CompanyMatches createMany
   */
  export type CompanyMatchesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanyMatches.
     */
    data: CompanyMatchesCreateManyInput | CompanyMatchesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanyMatches createManyAndReturn
   */
  export type CompanyMatchesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * The data used to create many CompanyMatches.
     */
    data: CompanyMatchesCreateManyInput | CompanyMatchesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyMatches update
   */
  export type CompanyMatchesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesInclude<ExtArgs> | null
    /**
     * The data needed to update a CompanyMatches.
     */
    data: XOR<CompanyMatchesUpdateInput, CompanyMatchesUncheckedUpdateInput>
    /**
     * Choose, which CompanyMatches to update.
     */
    where: CompanyMatchesWhereUniqueInput
  }

  /**
   * CompanyMatches updateMany
   */
  export type CompanyMatchesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanyMatches.
     */
    data: XOR<CompanyMatchesUpdateManyMutationInput, CompanyMatchesUncheckedUpdateManyInput>
    /**
     * Filter which CompanyMatches to update
     */
    where?: CompanyMatchesWhereInput
    /**
     * Limit how many CompanyMatches to update.
     */
    limit?: number
  }

  /**
   * CompanyMatches updateManyAndReturn
   */
  export type CompanyMatchesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * The data used to update CompanyMatches.
     */
    data: XOR<CompanyMatchesUpdateManyMutationInput, CompanyMatchesUncheckedUpdateManyInput>
    /**
     * Filter which CompanyMatches to update
     */
    where?: CompanyMatchesWhereInput
    /**
     * Limit how many CompanyMatches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyMatches upsert
   */
  export type CompanyMatchesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesInclude<ExtArgs> | null
    /**
     * The filter to search for the CompanyMatches to update in case it exists.
     */
    where: CompanyMatchesWhereUniqueInput
    /**
     * In case the CompanyMatches found by the `where` argument doesn't exist, create a new CompanyMatches with this data.
     */
    create: XOR<CompanyMatchesCreateInput, CompanyMatchesUncheckedCreateInput>
    /**
     * In case the CompanyMatches was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyMatchesUpdateInput, CompanyMatchesUncheckedUpdateInput>
  }

  /**
   * CompanyMatches delete
   */
  export type CompanyMatchesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesInclude<ExtArgs> | null
    /**
     * Filter which CompanyMatches to delete.
     */
    where: CompanyMatchesWhereUniqueInput
  }

  /**
   * CompanyMatches deleteMany
   */
  export type CompanyMatchesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyMatches to delete
     */
    where?: CompanyMatchesWhereInput
    /**
     * Limit how many CompanyMatches to delete.
     */
    limit?: number
  }

  /**
   * CompanyMatches without action
   */
  export type CompanyMatchesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyMatches
     */
    select?: CompanyMatchesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyMatches
     */
    omit?: CompanyMatchesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyMatchesInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    notification_id: number | null
    company_id: number | null
    related_company_id: number | null
  }

  export type NotificationSumAggregateOutputType = {
    notification_id: number | null
    company_id: number | null
    related_company_id: number | null
  }

  export type NotificationMinAggregateOutputType = {
    notification_id: number | null
    company_id: number | null
    type: string | null
    message: string | null
    related_company_id: number | null
    created_at: Date | null
    is_read: boolean | null
  }

  export type NotificationMaxAggregateOutputType = {
    notification_id: number | null
    company_id: number | null
    type: string | null
    message: string | null
    related_company_id: number | null
    created_at: Date | null
    is_read: boolean | null
  }

  export type NotificationCountAggregateOutputType = {
    notification_id: number
    company_id: number
    type: number
    message: number
    related_company_id: number
    created_at: number
    is_read: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    notification_id?: true
    company_id?: true
    related_company_id?: true
  }

  export type NotificationSumAggregateInputType = {
    notification_id?: true
    company_id?: true
    related_company_id?: true
  }

  export type NotificationMinAggregateInputType = {
    notification_id?: true
    company_id?: true
    type?: true
    message?: true
    related_company_id?: true
    created_at?: true
    is_read?: true
  }

  export type NotificationMaxAggregateInputType = {
    notification_id?: true
    company_id?: true
    type?: true
    message?: true
    related_company_id?: true
    created_at?: true
    is_read?: true
  }

  export type NotificationCountAggregateInputType = {
    notification_id?: true
    company_id?: true
    type?: true
    message?: true
    related_company_id?: true
    created_at?: true
    is_read?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    notification_id: number
    company_id: number
    type: string
    message: string | null
    related_company_id: number | null
    created_at: Date
    is_read: boolean
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    notification_id?: boolean
    company_id?: boolean
    type?: boolean
    message?: boolean
    related_company_id?: boolean
    created_at?: boolean
    is_read?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    related_company?: boolean | Notification$related_companyArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    notification_id?: boolean
    company_id?: boolean
    type?: boolean
    message?: boolean
    related_company_id?: boolean
    created_at?: boolean
    is_read?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    related_company?: boolean | Notification$related_companyArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    notification_id?: boolean
    company_id?: boolean
    type?: boolean
    message?: boolean
    related_company_id?: boolean
    created_at?: boolean
    is_read?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    related_company?: boolean | Notification$related_companyArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    notification_id?: boolean
    company_id?: boolean
    type?: boolean
    message?: boolean
    related_company_id?: boolean
    created_at?: boolean
    is_read?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"notification_id" | "company_id" | "type" | "message" | "related_company_id" | "created_at" | "is_read", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    related_company?: boolean | Notification$related_companyArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    related_company?: boolean | Notification$related_companyArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    related_company?: boolean | Notification$related_companyArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      related_company: Prisma.$CompanyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      notification_id: number
      company_id: number
      type: string
      message: string | null
      related_company_id: number | null
      created_at: Date
      is_read: boolean
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `notification_id`
     * const notificationWithNotification_idOnly = await prisma.notification.findMany({ select: { notification_id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `notification_id`
     * const notificationWithNotification_idOnly = await prisma.notification.createManyAndReturn({
     *   select: { notification_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `notification_id`
     * const notificationWithNotification_idOnly = await prisma.notification.updateManyAndReturn({
     *   select: { notification_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    related_company<T extends Notification$related_companyArgs<ExtArgs> = {}>(args?: Subset<T, Notification$related_companyArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly notification_id: FieldRef<"Notification", 'Int'>
    readonly company_id: FieldRef<"Notification", 'Int'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly related_company_id: FieldRef<"Notification", 'Int'>
    readonly created_at: FieldRef<"Notification", 'DateTime'>
    readonly is_read: FieldRef<"Notification", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification.related_company
   */
  export type Notification$related_companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CompanyScalarFieldEnum: {
    company_id: 'company_id',
    company_name: 'company_name',
    registration_number: 'registration_number',
    business_type: 'business_type',
    number_of_employees: 'number_of_employees',
    year_established: 'year_established',
    company_description: 'company_description',
    created_at: 'created_at',
    industry_id: 'industry_id',
    location_id: 'location_id'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const IndustryScalarFieldEnum: {
    industry_id: 'industry_id',
    industry_name: 'industry_name'
  };

  export type IndustryScalarFieldEnum = (typeof IndustryScalarFieldEnum)[keyof typeof IndustryScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    location_id: 'location_id',
    country: 'country'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    product_id: 'product_id',
    product_name: 'product_name'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const CompanyProductsScalarFieldEnum: {
    company_id: 'company_id',
    product_id: 'product_id'
  };

  export type CompanyProductsScalarFieldEnum = (typeof CompanyProductsScalarFieldEnum)[keyof typeof CompanyProductsScalarFieldEnum]


  export const RegionScalarFieldEnum: {
    region_id: 'region_id',
    region_name: 'region_name'
  };

  export type RegionScalarFieldEnum = (typeof RegionScalarFieldEnum)[keyof typeof RegionScalarFieldEnum]


  export const CompanyRegionsScalarFieldEnum: {
    company_id: 'company_id',
    region_id: 'region_id'
  };

  export type CompanyRegionsScalarFieldEnum = (typeof CompanyRegionsScalarFieldEnum)[keyof typeof CompanyRegionsScalarFieldEnum]


  export const CompanyTargetsScalarFieldEnum: {
    source_company_id: 'source_company_id',
    target_company_id: 'target_company_id',
    status: 'status',
    notes: 'notes',
    created_at: 'created_at'
  };

  export type CompanyTargetsScalarFieldEnum = (typeof CompanyTargetsScalarFieldEnum)[keyof typeof CompanyTargetsScalarFieldEnum]


  export const CompanyMatchesScalarFieldEnum: {
    company1_id: 'company1_id',
    company2_id: 'company2_id',
    matched_at: 'matched_at',
    match_type: 'match_type'
  };

  export type CompanyMatchesScalarFieldEnum = (typeof CompanyMatchesScalarFieldEnum)[keyof typeof CompanyMatchesScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    notification_id: 'notification_id',
    company_id: 'company_id',
    type: 'type',
    message: 'message',
    related_company_id: 'related_company_id',
    created_at: 'created_at',
    is_read: 'is_read'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    company_id?: IntFilter<"Company"> | number
    company_name?: StringFilter<"Company"> | string
    registration_number?: StringFilter<"Company"> | string
    business_type?: StringFilter<"Company"> | string
    number_of_employees?: IntNullableFilter<"Company"> | number | null
    year_established?: IntNullableFilter<"Company"> | number | null
    company_description?: StringNullableFilter<"Company"> | string | null
    created_at?: DateTimeFilter<"Company"> | Date | string
    industry_id?: IntNullableFilter<"Company"> | number | null
    location_id?: IntNullableFilter<"Company"> | number | null
    industry?: XOR<IndustryNullableScalarRelationFilter, IndustryWhereInput> | null
    location?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    matches?: CompanyMatchesListRelationFilter
    matched_with?: CompanyMatchesListRelationFilter
    products?: CompanyProductsListRelationFilter
    regions?: CompanyRegionsListRelationFilter
    targets?: CompanyTargetsListRelationFilter
    target_of?: CompanyTargetsListRelationFilter
    notifications?: NotificationListRelationFilter
    triggered_notifications?: NotificationListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    company_id?: SortOrder
    company_name?: SortOrder
    registration_number?: SortOrder
    business_type?: SortOrder
    number_of_employees?: SortOrderInput | SortOrder
    year_established?: SortOrderInput | SortOrder
    company_description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    industry_id?: SortOrderInput | SortOrder
    location_id?: SortOrderInput | SortOrder
    industry?: IndustryOrderByWithRelationInput
    location?: LocationOrderByWithRelationInput
    matches?: CompanyMatchesOrderByRelationAggregateInput
    matched_with?: CompanyMatchesOrderByRelationAggregateInput
    products?: CompanyProductsOrderByRelationAggregateInput
    regions?: CompanyRegionsOrderByRelationAggregateInput
    targets?: CompanyTargetsOrderByRelationAggregateInput
    target_of?: CompanyTargetsOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    triggered_notifications?: NotificationOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    company_id?: number
    registration_number?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    company_name?: StringFilter<"Company"> | string
    business_type?: StringFilter<"Company"> | string
    number_of_employees?: IntNullableFilter<"Company"> | number | null
    year_established?: IntNullableFilter<"Company"> | number | null
    company_description?: StringNullableFilter<"Company"> | string | null
    created_at?: DateTimeFilter<"Company"> | Date | string
    industry_id?: IntNullableFilter<"Company"> | number | null
    location_id?: IntNullableFilter<"Company"> | number | null
    industry?: XOR<IndustryNullableScalarRelationFilter, IndustryWhereInput> | null
    location?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    matches?: CompanyMatchesListRelationFilter
    matched_with?: CompanyMatchesListRelationFilter
    products?: CompanyProductsListRelationFilter
    regions?: CompanyRegionsListRelationFilter
    targets?: CompanyTargetsListRelationFilter
    target_of?: CompanyTargetsListRelationFilter
    notifications?: NotificationListRelationFilter
    triggered_notifications?: NotificationListRelationFilter
  }, "company_id" | "registration_number">

  export type CompanyOrderByWithAggregationInput = {
    company_id?: SortOrder
    company_name?: SortOrder
    registration_number?: SortOrder
    business_type?: SortOrder
    number_of_employees?: SortOrderInput | SortOrder
    year_established?: SortOrderInput | SortOrder
    company_description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    industry_id?: SortOrderInput | SortOrder
    location_id?: SortOrderInput | SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _avg?: CompanyAvgOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
    _sum?: CompanySumOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    company_id?: IntWithAggregatesFilter<"Company"> | number
    company_name?: StringWithAggregatesFilter<"Company"> | string
    registration_number?: StringWithAggregatesFilter<"Company"> | string
    business_type?: StringWithAggregatesFilter<"Company"> | string
    number_of_employees?: IntNullableWithAggregatesFilter<"Company"> | number | null
    year_established?: IntNullableWithAggregatesFilter<"Company"> | number | null
    company_description?: StringNullableWithAggregatesFilter<"Company"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    industry_id?: IntNullableWithAggregatesFilter<"Company"> | number | null
    location_id?: IntNullableWithAggregatesFilter<"Company"> | number | null
  }

  export type IndustryWhereInput = {
    AND?: IndustryWhereInput | IndustryWhereInput[]
    OR?: IndustryWhereInput[]
    NOT?: IndustryWhereInput | IndustryWhereInput[]
    industry_id?: IntFilter<"Industry"> | number
    industry_name?: StringFilter<"Industry"> | string
    companies?: CompanyListRelationFilter
  }

  export type IndustryOrderByWithRelationInput = {
    industry_id?: SortOrder
    industry_name?: SortOrder
    companies?: CompanyOrderByRelationAggregateInput
  }

  export type IndustryWhereUniqueInput = Prisma.AtLeast<{
    industry_id?: number
    industry_name?: string
    AND?: IndustryWhereInput | IndustryWhereInput[]
    OR?: IndustryWhereInput[]
    NOT?: IndustryWhereInput | IndustryWhereInput[]
    companies?: CompanyListRelationFilter
  }, "industry_id" | "industry_name">

  export type IndustryOrderByWithAggregationInput = {
    industry_id?: SortOrder
    industry_name?: SortOrder
    _count?: IndustryCountOrderByAggregateInput
    _avg?: IndustryAvgOrderByAggregateInput
    _max?: IndustryMaxOrderByAggregateInput
    _min?: IndustryMinOrderByAggregateInput
    _sum?: IndustrySumOrderByAggregateInput
  }

  export type IndustryScalarWhereWithAggregatesInput = {
    AND?: IndustryScalarWhereWithAggregatesInput | IndustryScalarWhereWithAggregatesInput[]
    OR?: IndustryScalarWhereWithAggregatesInput[]
    NOT?: IndustryScalarWhereWithAggregatesInput | IndustryScalarWhereWithAggregatesInput[]
    industry_id?: IntWithAggregatesFilter<"Industry"> | number
    industry_name?: StringWithAggregatesFilter<"Industry"> | string
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    location_id?: IntFilter<"Location"> | number
    country?: StringFilter<"Location"> | string
    companies?: CompanyListRelationFilter
  }

  export type LocationOrderByWithRelationInput = {
    location_id?: SortOrder
    country?: SortOrder
    companies?: CompanyOrderByRelationAggregateInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    location_id?: number
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    country?: StringFilter<"Location"> | string
    companies?: CompanyListRelationFilter
  }, "location_id">

  export type LocationOrderByWithAggregationInput = {
    location_id?: SortOrder
    country?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _avg?: LocationAvgOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
    _sum?: LocationSumOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    location_id?: IntWithAggregatesFilter<"Location"> | number
    country?: StringWithAggregatesFilter<"Location"> | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    product_id?: IntFilter<"Product"> | number
    product_name?: StringFilter<"Product"> | string
    companies?: CompanyProductsListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    product_id?: SortOrder
    product_name?: SortOrder
    companies?: CompanyProductsOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    product_id?: number
    product_name?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    companies?: CompanyProductsListRelationFilter
  }, "product_id" | "product_name">

  export type ProductOrderByWithAggregationInput = {
    product_id?: SortOrder
    product_name?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    product_id?: IntWithAggregatesFilter<"Product"> | number
    product_name?: StringWithAggregatesFilter<"Product"> | string
  }

  export type CompanyProductsWhereInput = {
    AND?: CompanyProductsWhereInput | CompanyProductsWhereInput[]
    OR?: CompanyProductsWhereInput[]
    NOT?: CompanyProductsWhereInput | CompanyProductsWhereInput[]
    company_id?: IntFilter<"CompanyProducts"> | number
    product_id?: IntFilter<"CompanyProducts"> | number
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type CompanyProductsOrderByWithRelationInput = {
    company_id?: SortOrder
    product_id?: SortOrder
    company?: CompanyOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type CompanyProductsWhereUniqueInput = Prisma.AtLeast<{
    company_id_product_id?: CompanyProductsCompany_idProduct_idCompoundUniqueInput
    AND?: CompanyProductsWhereInput | CompanyProductsWhereInput[]
    OR?: CompanyProductsWhereInput[]
    NOT?: CompanyProductsWhereInput | CompanyProductsWhereInput[]
    company_id?: IntFilter<"CompanyProducts"> | number
    product_id?: IntFilter<"CompanyProducts"> | number
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "company_id_product_id">

  export type CompanyProductsOrderByWithAggregationInput = {
    company_id?: SortOrder
    product_id?: SortOrder
    _count?: CompanyProductsCountOrderByAggregateInput
    _avg?: CompanyProductsAvgOrderByAggregateInput
    _max?: CompanyProductsMaxOrderByAggregateInput
    _min?: CompanyProductsMinOrderByAggregateInput
    _sum?: CompanyProductsSumOrderByAggregateInput
  }

  export type CompanyProductsScalarWhereWithAggregatesInput = {
    AND?: CompanyProductsScalarWhereWithAggregatesInput | CompanyProductsScalarWhereWithAggregatesInput[]
    OR?: CompanyProductsScalarWhereWithAggregatesInput[]
    NOT?: CompanyProductsScalarWhereWithAggregatesInput | CompanyProductsScalarWhereWithAggregatesInput[]
    company_id?: IntWithAggregatesFilter<"CompanyProducts"> | number
    product_id?: IntWithAggregatesFilter<"CompanyProducts"> | number
  }

  export type RegionWhereInput = {
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    region_id?: IntFilter<"Region"> | number
    region_name?: StringFilter<"Region"> | string
    companies?: CompanyRegionsListRelationFilter
  }

  export type RegionOrderByWithRelationInput = {
    region_id?: SortOrder
    region_name?: SortOrder
    companies?: CompanyRegionsOrderByRelationAggregateInput
  }

  export type RegionWhereUniqueInput = Prisma.AtLeast<{
    region_id?: number
    region_name?: string
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    companies?: CompanyRegionsListRelationFilter
  }, "region_id" | "region_name">

  export type RegionOrderByWithAggregationInput = {
    region_id?: SortOrder
    region_name?: SortOrder
    _count?: RegionCountOrderByAggregateInput
    _avg?: RegionAvgOrderByAggregateInput
    _max?: RegionMaxOrderByAggregateInput
    _min?: RegionMinOrderByAggregateInput
    _sum?: RegionSumOrderByAggregateInput
  }

  export type RegionScalarWhereWithAggregatesInput = {
    AND?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    OR?: RegionScalarWhereWithAggregatesInput[]
    NOT?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    region_id?: IntWithAggregatesFilter<"Region"> | number
    region_name?: StringWithAggregatesFilter<"Region"> | string
  }

  export type CompanyRegionsWhereInput = {
    AND?: CompanyRegionsWhereInput | CompanyRegionsWhereInput[]
    OR?: CompanyRegionsWhereInput[]
    NOT?: CompanyRegionsWhereInput | CompanyRegionsWhereInput[]
    company_id?: IntFilter<"CompanyRegions"> | number
    region_id?: IntFilter<"CompanyRegions"> | number
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }

  export type CompanyRegionsOrderByWithRelationInput = {
    company_id?: SortOrder
    region_id?: SortOrder
    company?: CompanyOrderByWithRelationInput
    region?: RegionOrderByWithRelationInput
  }

  export type CompanyRegionsWhereUniqueInput = Prisma.AtLeast<{
    company_id_region_id?: CompanyRegionsCompany_idRegion_idCompoundUniqueInput
    AND?: CompanyRegionsWhereInput | CompanyRegionsWhereInput[]
    OR?: CompanyRegionsWhereInput[]
    NOT?: CompanyRegionsWhereInput | CompanyRegionsWhereInput[]
    company_id?: IntFilter<"CompanyRegions"> | number
    region_id?: IntFilter<"CompanyRegions"> | number
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }, "company_id_region_id">

  export type CompanyRegionsOrderByWithAggregationInput = {
    company_id?: SortOrder
    region_id?: SortOrder
    _count?: CompanyRegionsCountOrderByAggregateInput
    _avg?: CompanyRegionsAvgOrderByAggregateInput
    _max?: CompanyRegionsMaxOrderByAggregateInput
    _min?: CompanyRegionsMinOrderByAggregateInput
    _sum?: CompanyRegionsSumOrderByAggregateInput
  }

  export type CompanyRegionsScalarWhereWithAggregatesInput = {
    AND?: CompanyRegionsScalarWhereWithAggregatesInput | CompanyRegionsScalarWhereWithAggregatesInput[]
    OR?: CompanyRegionsScalarWhereWithAggregatesInput[]
    NOT?: CompanyRegionsScalarWhereWithAggregatesInput | CompanyRegionsScalarWhereWithAggregatesInput[]
    company_id?: IntWithAggregatesFilter<"CompanyRegions"> | number
    region_id?: IntWithAggregatesFilter<"CompanyRegions"> | number
  }

  export type CompanyTargetsWhereInput = {
    AND?: CompanyTargetsWhereInput | CompanyTargetsWhereInput[]
    OR?: CompanyTargetsWhereInput[]
    NOT?: CompanyTargetsWhereInput | CompanyTargetsWhereInput[]
    source_company_id?: IntFilter<"CompanyTargets"> | number
    target_company_id?: IntFilter<"CompanyTargets"> | number
    status?: StringNullableFilter<"CompanyTargets"> | string | null
    notes?: StringNullableFilter<"CompanyTargets"> | string | null
    created_at?: DateTimeFilter<"CompanyTargets"> | Date | string
    source?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    target?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type CompanyTargetsOrderByWithRelationInput = {
    source_company_id?: SortOrder
    target_company_id?: SortOrder
    status?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    source?: CompanyOrderByWithRelationInput
    target?: CompanyOrderByWithRelationInput
  }

  export type CompanyTargetsWhereUniqueInput = Prisma.AtLeast<{
    source_company_id_target_company_id?: CompanyTargetsSource_company_idTarget_company_idCompoundUniqueInput
    AND?: CompanyTargetsWhereInput | CompanyTargetsWhereInput[]
    OR?: CompanyTargetsWhereInput[]
    NOT?: CompanyTargetsWhereInput | CompanyTargetsWhereInput[]
    source_company_id?: IntFilter<"CompanyTargets"> | number
    target_company_id?: IntFilter<"CompanyTargets"> | number
    status?: StringNullableFilter<"CompanyTargets"> | string | null
    notes?: StringNullableFilter<"CompanyTargets"> | string | null
    created_at?: DateTimeFilter<"CompanyTargets"> | Date | string
    source?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    target?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "source_company_id_target_company_id">

  export type CompanyTargetsOrderByWithAggregationInput = {
    source_company_id?: SortOrder
    target_company_id?: SortOrder
    status?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: CompanyTargetsCountOrderByAggregateInput
    _avg?: CompanyTargetsAvgOrderByAggregateInput
    _max?: CompanyTargetsMaxOrderByAggregateInput
    _min?: CompanyTargetsMinOrderByAggregateInput
    _sum?: CompanyTargetsSumOrderByAggregateInput
  }

  export type CompanyTargetsScalarWhereWithAggregatesInput = {
    AND?: CompanyTargetsScalarWhereWithAggregatesInput | CompanyTargetsScalarWhereWithAggregatesInput[]
    OR?: CompanyTargetsScalarWhereWithAggregatesInput[]
    NOT?: CompanyTargetsScalarWhereWithAggregatesInput | CompanyTargetsScalarWhereWithAggregatesInput[]
    source_company_id?: IntWithAggregatesFilter<"CompanyTargets"> | number
    target_company_id?: IntWithAggregatesFilter<"CompanyTargets"> | number
    status?: StringNullableWithAggregatesFilter<"CompanyTargets"> | string | null
    notes?: StringNullableWithAggregatesFilter<"CompanyTargets"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"CompanyTargets"> | Date | string
  }

  export type CompanyMatchesWhereInput = {
    AND?: CompanyMatchesWhereInput | CompanyMatchesWhereInput[]
    OR?: CompanyMatchesWhereInput[]
    NOT?: CompanyMatchesWhereInput | CompanyMatchesWhereInput[]
    company1_id?: IntFilter<"CompanyMatches"> | number
    company2_id?: IntFilter<"CompanyMatches"> | number
    matched_at?: DateTimeFilter<"CompanyMatches"> | Date | string
    match_type?: StringNullableFilter<"CompanyMatches"> | string | null
    company1?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    company2?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type CompanyMatchesOrderByWithRelationInput = {
    company1_id?: SortOrder
    company2_id?: SortOrder
    matched_at?: SortOrder
    match_type?: SortOrderInput | SortOrder
    company1?: CompanyOrderByWithRelationInput
    company2?: CompanyOrderByWithRelationInput
  }

  export type CompanyMatchesWhereUniqueInput = Prisma.AtLeast<{
    company1_id_company2_id?: CompanyMatchesCompany1_idCompany2_idCompoundUniqueInput
    AND?: CompanyMatchesWhereInput | CompanyMatchesWhereInput[]
    OR?: CompanyMatchesWhereInput[]
    NOT?: CompanyMatchesWhereInput | CompanyMatchesWhereInput[]
    company1_id?: IntFilter<"CompanyMatches"> | number
    company2_id?: IntFilter<"CompanyMatches"> | number
    matched_at?: DateTimeFilter<"CompanyMatches"> | Date | string
    match_type?: StringNullableFilter<"CompanyMatches"> | string | null
    company1?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    company2?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "company1_id_company2_id">

  export type CompanyMatchesOrderByWithAggregationInput = {
    company1_id?: SortOrder
    company2_id?: SortOrder
    matched_at?: SortOrder
    match_type?: SortOrderInput | SortOrder
    _count?: CompanyMatchesCountOrderByAggregateInput
    _avg?: CompanyMatchesAvgOrderByAggregateInput
    _max?: CompanyMatchesMaxOrderByAggregateInput
    _min?: CompanyMatchesMinOrderByAggregateInput
    _sum?: CompanyMatchesSumOrderByAggregateInput
  }

  export type CompanyMatchesScalarWhereWithAggregatesInput = {
    AND?: CompanyMatchesScalarWhereWithAggregatesInput | CompanyMatchesScalarWhereWithAggregatesInput[]
    OR?: CompanyMatchesScalarWhereWithAggregatesInput[]
    NOT?: CompanyMatchesScalarWhereWithAggregatesInput | CompanyMatchesScalarWhereWithAggregatesInput[]
    company1_id?: IntWithAggregatesFilter<"CompanyMatches"> | number
    company2_id?: IntWithAggregatesFilter<"CompanyMatches"> | number
    matched_at?: DateTimeWithAggregatesFilter<"CompanyMatches"> | Date | string
    match_type?: StringNullableWithAggregatesFilter<"CompanyMatches"> | string | null
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    notification_id?: IntFilter<"Notification"> | number
    company_id?: IntFilter<"Notification"> | number
    type?: StringFilter<"Notification"> | string
    message?: StringNullableFilter<"Notification"> | string | null
    related_company_id?: IntNullableFilter<"Notification"> | number | null
    created_at?: DateTimeFilter<"Notification"> | Date | string
    is_read?: BoolFilter<"Notification"> | boolean
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    related_company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
  }

  export type NotificationOrderByWithRelationInput = {
    notification_id?: SortOrder
    company_id?: SortOrder
    type?: SortOrder
    message?: SortOrderInput | SortOrder
    related_company_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    is_read?: SortOrder
    company?: CompanyOrderByWithRelationInput
    related_company?: CompanyOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    notification_id?: number
    company_id_related_company_id_type?: NotificationCompany_idRelated_company_idTypeCompoundUniqueInput
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    company_id?: IntFilter<"Notification"> | number
    type?: StringFilter<"Notification"> | string
    message?: StringNullableFilter<"Notification"> | string | null
    related_company_id?: IntNullableFilter<"Notification"> | number | null
    created_at?: DateTimeFilter<"Notification"> | Date | string
    is_read?: BoolFilter<"Notification"> | boolean
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    related_company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
  }, "notification_id" | "company_id_related_company_id_type">

  export type NotificationOrderByWithAggregationInput = {
    notification_id?: SortOrder
    company_id?: SortOrder
    type?: SortOrder
    message?: SortOrderInput | SortOrder
    related_company_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    is_read?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    notification_id?: IntWithAggregatesFilter<"Notification"> | number
    company_id?: IntWithAggregatesFilter<"Notification"> | number
    type?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    related_company_id?: IntNullableWithAggregatesFilter<"Notification"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    is_read?: BoolWithAggregatesFilter<"Notification"> | boolean
  }

  export type CompanyCreateInput = {
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry?: IndustryCreateNestedOneWithoutCompaniesInput
    location?: LocationCreateNestedOneWithoutCompaniesInput
    matches?: CompanyMatchesCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsCreateNestedManyWithoutTargetInput
    notifications?: NotificationCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyUncheckedCreateInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry_id?: number | null
    location_id?: number | null
    matches?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsUncheckedCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsUncheckedCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsUncheckedCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsUncheckedCreateNestedManyWithoutTargetInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationUncheckedCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyUpdateInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry?: IndustryUpdateOneWithoutCompaniesNestedInput
    location?: LocationUpdateOneWithoutCompaniesNestedInput
    matches?: CompanyMatchesUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    matches?: CompanyMatchesUncheckedUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUncheckedUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUncheckedUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUncheckedUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUncheckedUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUncheckedUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUncheckedUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyCreateManyInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry_id?: number | null
    location_id?: number | null
  }

  export type CompanyUpdateManyMutationInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type IndustryCreateInput = {
    industry_name: string
    companies?: CompanyCreateNestedManyWithoutIndustryInput
  }

  export type IndustryUncheckedCreateInput = {
    industry_id?: number
    industry_name: string
    companies?: CompanyUncheckedCreateNestedManyWithoutIndustryInput
  }

  export type IndustryUpdateInput = {
    industry_name?: StringFieldUpdateOperationsInput | string
    companies?: CompanyUpdateManyWithoutIndustryNestedInput
  }

  export type IndustryUncheckedUpdateInput = {
    industry_id?: IntFieldUpdateOperationsInput | number
    industry_name?: StringFieldUpdateOperationsInput | string
    companies?: CompanyUncheckedUpdateManyWithoutIndustryNestedInput
  }

  export type IndustryCreateManyInput = {
    industry_id?: number
    industry_name: string
  }

  export type IndustryUpdateManyMutationInput = {
    industry_name?: StringFieldUpdateOperationsInput | string
  }

  export type IndustryUncheckedUpdateManyInput = {
    industry_id?: IntFieldUpdateOperationsInput | number
    industry_name?: StringFieldUpdateOperationsInput | string
  }

  export type LocationCreateInput = {
    country: string
    companies?: CompanyCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateInput = {
    location_id?: number
    country: string
    companies?: CompanyUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationUpdateInput = {
    country?: StringFieldUpdateOperationsInput | string
    companies?: CompanyUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    location_id?: IntFieldUpdateOperationsInput | number
    country?: StringFieldUpdateOperationsInput | string
    companies?: CompanyUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationCreateManyInput = {
    location_id?: number
    country: string
  }

  export type LocationUpdateManyMutationInput = {
    country?: StringFieldUpdateOperationsInput | string
  }

  export type LocationUncheckedUpdateManyInput = {
    location_id?: IntFieldUpdateOperationsInput | number
    country?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCreateInput = {
    product_name: string
    companies?: CompanyProductsCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    product_id?: number
    product_name: string
    companies?: CompanyProductsUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    product_name?: StringFieldUpdateOperationsInput | string
    companies?: CompanyProductsUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    product_id?: IntFieldUpdateOperationsInput | number
    product_name?: StringFieldUpdateOperationsInput | string
    companies?: CompanyProductsUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    product_id?: number
    product_name: string
  }

  export type ProductUpdateManyMutationInput = {
    product_name?: StringFieldUpdateOperationsInput | string
  }

  export type ProductUncheckedUpdateManyInput = {
    product_id?: IntFieldUpdateOperationsInput | number
    product_name?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyProductsCreateInput = {
    company: CompanyCreateNestedOneWithoutProductsInput
    product: ProductCreateNestedOneWithoutCompaniesInput
  }

  export type CompanyProductsUncheckedCreateInput = {
    company_id: number
    product_id: number
  }

  export type CompanyProductsUpdateInput = {
    company?: CompanyUpdateOneRequiredWithoutProductsNestedInput
    product?: ProductUpdateOneRequiredWithoutCompaniesNestedInput
  }

  export type CompanyProductsUncheckedUpdateInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    product_id?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyProductsCreateManyInput = {
    company_id: number
    product_id: number
  }

  export type CompanyProductsUpdateManyMutationInput = {

  }

  export type CompanyProductsUncheckedUpdateManyInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    product_id?: IntFieldUpdateOperationsInput | number
  }

  export type RegionCreateInput = {
    region_name: string
    companies?: CompanyRegionsCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateInput = {
    region_id?: number
    region_name: string
    companies?: CompanyRegionsUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionUpdateInput = {
    region_name?: StringFieldUpdateOperationsInput | string
    companies?: CompanyRegionsUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateInput = {
    region_id?: IntFieldUpdateOperationsInput | number
    region_name?: StringFieldUpdateOperationsInput | string
    companies?: CompanyRegionsUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type RegionCreateManyInput = {
    region_id?: number
    region_name: string
  }

  export type RegionUpdateManyMutationInput = {
    region_name?: StringFieldUpdateOperationsInput | string
  }

  export type RegionUncheckedUpdateManyInput = {
    region_id?: IntFieldUpdateOperationsInput | number
    region_name?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyRegionsCreateInput = {
    company: CompanyCreateNestedOneWithoutRegionsInput
    region: RegionCreateNestedOneWithoutCompaniesInput
  }

  export type CompanyRegionsUncheckedCreateInput = {
    company_id: number
    region_id: number
  }

  export type CompanyRegionsUpdateInput = {
    company?: CompanyUpdateOneRequiredWithoutRegionsNestedInput
    region?: RegionUpdateOneRequiredWithoutCompaniesNestedInput
  }

  export type CompanyRegionsUncheckedUpdateInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyRegionsCreateManyInput = {
    company_id: number
    region_id: number
  }

  export type CompanyRegionsUpdateManyMutationInput = {

  }

  export type CompanyRegionsUncheckedUpdateManyInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyTargetsCreateInput = {
    status?: string | null
    notes?: string | null
    created_at?: Date | string
    source: CompanyCreateNestedOneWithoutTargetsInput
    target: CompanyCreateNestedOneWithoutTarget_ofInput
  }

  export type CompanyTargetsUncheckedCreateInput = {
    source_company_id: number
    target_company_id: number
    status?: string | null
    notes?: string | null
    created_at?: Date | string
  }

  export type CompanyTargetsUpdateInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: CompanyUpdateOneRequiredWithoutTargetsNestedInput
    target?: CompanyUpdateOneRequiredWithoutTarget_ofNestedInput
  }

  export type CompanyTargetsUncheckedUpdateInput = {
    source_company_id?: IntFieldUpdateOperationsInput | number
    target_company_id?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyTargetsCreateManyInput = {
    source_company_id: number
    target_company_id: number
    status?: string | null
    notes?: string | null
    created_at?: Date | string
  }

  export type CompanyTargetsUpdateManyMutationInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyTargetsUncheckedUpdateManyInput = {
    source_company_id?: IntFieldUpdateOperationsInput | number
    target_company_id?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyMatchesCreateInput = {
    matched_at?: Date | string
    match_type?: string | null
    company1: CompanyCreateNestedOneWithoutMatchesInput
    company2: CompanyCreateNestedOneWithoutMatched_withInput
  }

  export type CompanyMatchesUncheckedCreateInput = {
    company1_id: number
    company2_id: number
    matched_at?: Date | string
    match_type?: string | null
  }

  export type CompanyMatchesUpdateInput = {
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_type?: NullableStringFieldUpdateOperationsInput | string | null
    company1?: CompanyUpdateOneRequiredWithoutMatchesNestedInput
    company2?: CompanyUpdateOneRequiredWithoutMatched_withNestedInput
  }

  export type CompanyMatchesUncheckedUpdateInput = {
    company1_id?: IntFieldUpdateOperationsInput | number
    company2_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_type?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyMatchesCreateManyInput = {
    company1_id: number
    company2_id: number
    matched_at?: Date | string
    match_type?: string | null
  }

  export type CompanyMatchesUpdateManyMutationInput = {
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_type?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyMatchesUncheckedUpdateManyInput = {
    company1_id?: IntFieldUpdateOperationsInput | number
    company2_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_type?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NotificationCreateInput = {
    type: string
    message?: string | null
    created_at?: Date | string
    is_read?: boolean
    company: CompanyCreateNestedOneWithoutNotificationsInput
    related_company?: CompanyCreateNestedOneWithoutTriggered_notificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    notification_id?: number
    company_id: number
    type: string
    message?: string | null
    related_company_id?: number | null
    created_at?: Date | string
    is_read?: boolean
  }

  export type NotificationUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_read?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneRequiredWithoutNotificationsNestedInput
    related_company?: CompanyUpdateOneWithoutTriggered_notificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    company_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    related_company_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NotificationCreateManyInput = {
    notification_id?: number
    company_id: number
    type: string
    message?: string | null
    related_company_id?: number | null
    created_at?: Date | string
    is_read?: boolean
  }

  export type NotificationUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NotificationUncheckedUpdateManyInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    company_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    related_company_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IndustryNullableScalarRelationFilter = {
    is?: IndustryWhereInput | null
    isNot?: IndustryWhereInput | null
  }

  export type LocationNullableScalarRelationFilter = {
    is?: LocationWhereInput | null
    isNot?: LocationWhereInput | null
  }

  export type CompanyMatchesListRelationFilter = {
    every?: CompanyMatchesWhereInput
    some?: CompanyMatchesWhereInput
    none?: CompanyMatchesWhereInput
  }

  export type CompanyProductsListRelationFilter = {
    every?: CompanyProductsWhereInput
    some?: CompanyProductsWhereInput
    none?: CompanyProductsWhereInput
  }

  export type CompanyRegionsListRelationFilter = {
    every?: CompanyRegionsWhereInput
    some?: CompanyRegionsWhereInput
    none?: CompanyRegionsWhereInput
  }

  export type CompanyTargetsListRelationFilter = {
    every?: CompanyTargetsWhereInput
    some?: CompanyTargetsWhereInput
    none?: CompanyTargetsWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CompanyMatchesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyProductsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyRegionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyTargetsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    company_id?: SortOrder
    company_name?: SortOrder
    registration_number?: SortOrder
    business_type?: SortOrder
    number_of_employees?: SortOrder
    year_established?: SortOrder
    company_description?: SortOrder
    created_at?: SortOrder
    industry_id?: SortOrder
    location_id?: SortOrder
  }

  export type CompanyAvgOrderByAggregateInput = {
    company_id?: SortOrder
    number_of_employees?: SortOrder
    year_established?: SortOrder
    industry_id?: SortOrder
    location_id?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    company_id?: SortOrder
    company_name?: SortOrder
    registration_number?: SortOrder
    business_type?: SortOrder
    number_of_employees?: SortOrder
    year_established?: SortOrder
    company_description?: SortOrder
    created_at?: SortOrder
    industry_id?: SortOrder
    location_id?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    company_id?: SortOrder
    company_name?: SortOrder
    registration_number?: SortOrder
    business_type?: SortOrder
    number_of_employees?: SortOrder
    year_established?: SortOrder
    company_description?: SortOrder
    created_at?: SortOrder
    industry_id?: SortOrder
    location_id?: SortOrder
  }

  export type CompanySumOrderByAggregateInput = {
    company_id?: SortOrder
    number_of_employees?: SortOrder
    year_established?: SortOrder
    industry_id?: SortOrder
    location_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CompanyListRelationFilter = {
    every?: CompanyWhereInput
    some?: CompanyWhereInput
    none?: CompanyWhereInput
  }

  export type CompanyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IndustryCountOrderByAggregateInput = {
    industry_id?: SortOrder
    industry_name?: SortOrder
  }

  export type IndustryAvgOrderByAggregateInput = {
    industry_id?: SortOrder
  }

  export type IndustryMaxOrderByAggregateInput = {
    industry_id?: SortOrder
    industry_name?: SortOrder
  }

  export type IndustryMinOrderByAggregateInput = {
    industry_id?: SortOrder
    industry_name?: SortOrder
  }

  export type IndustrySumOrderByAggregateInput = {
    industry_id?: SortOrder
  }

  export type LocationCountOrderByAggregateInput = {
    location_id?: SortOrder
    country?: SortOrder
  }

  export type LocationAvgOrderByAggregateInput = {
    location_id?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    location_id?: SortOrder
    country?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    location_id?: SortOrder
    country?: SortOrder
  }

  export type LocationSumOrderByAggregateInput = {
    location_id?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    product_id?: SortOrder
    product_name?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    product_id?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    product_id?: SortOrder
    product_name?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    product_id?: SortOrder
    product_name?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    product_id?: SortOrder
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type CompanyProductsCompany_idProduct_idCompoundUniqueInput = {
    company_id: number
    product_id: number
  }

  export type CompanyProductsCountOrderByAggregateInput = {
    company_id?: SortOrder
    product_id?: SortOrder
  }

  export type CompanyProductsAvgOrderByAggregateInput = {
    company_id?: SortOrder
    product_id?: SortOrder
  }

  export type CompanyProductsMaxOrderByAggregateInput = {
    company_id?: SortOrder
    product_id?: SortOrder
  }

  export type CompanyProductsMinOrderByAggregateInput = {
    company_id?: SortOrder
    product_id?: SortOrder
  }

  export type CompanyProductsSumOrderByAggregateInput = {
    company_id?: SortOrder
    product_id?: SortOrder
  }

  export type RegionCountOrderByAggregateInput = {
    region_id?: SortOrder
    region_name?: SortOrder
  }

  export type RegionAvgOrderByAggregateInput = {
    region_id?: SortOrder
  }

  export type RegionMaxOrderByAggregateInput = {
    region_id?: SortOrder
    region_name?: SortOrder
  }

  export type RegionMinOrderByAggregateInput = {
    region_id?: SortOrder
    region_name?: SortOrder
  }

  export type RegionSumOrderByAggregateInput = {
    region_id?: SortOrder
  }

  export type RegionScalarRelationFilter = {
    is?: RegionWhereInput
    isNot?: RegionWhereInput
  }

  export type CompanyRegionsCompany_idRegion_idCompoundUniqueInput = {
    company_id: number
    region_id: number
  }

  export type CompanyRegionsCountOrderByAggregateInput = {
    company_id?: SortOrder
    region_id?: SortOrder
  }

  export type CompanyRegionsAvgOrderByAggregateInput = {
    company_id?: SortOrder
    region_id?: SortOrder
  }

  export type CompanyRegionsMaxOrderByAggregateInput = {
    company_id?: SortOrder
    region_id?: SortOrder
  }

  export type CompanyRegionsMinOrderByAggregateInput = {
    company_id?: SortOrder
    region_id?: SortOrder
  }

  export type CompanyRegionsSumOrderByAggregateInput = {
    company_id?: SortOrder
    region_id?: SortOrder
  }

  export type CompanyTargetsSource_company_idTarget_company_idCompoundUniqueInput = {
    source_company_id: number
    target_company_id: number
  }

  export type CompanyTargetsCountOrderByAggregateInput = {
    source_company_id?: SortOrder
    target_company_id?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type CompanyTargetsAvgOrderByAggregateInput = {
    source_company_id?: SortOrder
    target_company_id?: SortOrder
  }

  export type CompanyTargetsMaxOrderByAggregateInput = {
    source_company_id?: SortOrder
    target_company_id?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type CompanyTargetsMinOrderByAggregateInput = {
    source_company_id?: SortOrder
    target_company_id?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type CompanyTargetsSumOrderByAggregateInput = {
    source_company_id?: SortOrder
    target_company_id?: SortOrder
  }

  export type CompanyMatchesCompany1_idCompany2_idCompoundUniqueInput = {
    company1_id: number
    company2_id: number
  }

  export type CompanyMatchesCountOrderByAggregateInput = {
    company1_id?: SortOrder
    company2_id?: SortOrder
    matched_at?: SortOrder
    match_type?: SortOrder
  }

  export type CompanyMatchesAvgOrderByAggregateInput = {
    company1_id?: SortOrder
    company2_id?: SortOrder
  }

  export type CompanyMatchesMaxOrderByAggregateInput = {
    company1_id?: SortOrder
    company2_id?: SortOrder
    matched_at?: SortOrder
    match_type?: SortOrder
  }

  export type CompanyMatchesMinOrderByAggregateInput = {
    company1_id?: SortOrder
    company2_id?: SortOrder
    matched_at?: SortOrder
    match_type?: SortOrder
  }

  export type CompanyMatchesSumOrderByAggregateInput = {
    company1_id?: SortOrder
    company2_id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CompanyNullableScalarRelationFilter = {
    is?: CompanyWhereInput | null
    isNot?: CompanyWhereInput | null
  }

  export type NotificationCompany_idRelated_company_idTypeCompoundUniqueInput = {
    company_id: number
    related_company_id: number
    type: string
  }

  export type NotificationCountOrderByAggregateInput = {
    notification_id?: SortOrder
    company_id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    related_company_id?: SortOrder
    created_at?: SortOrder
    is_read?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    notification_id?: SortOrder
    company_id?: SortOrder
    related_company_id?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    notification_id?: SortOrder
    company_id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    related_company_id?: SortOrder
    created_at?: SortOrder
    is_read?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    notification_id?: SortOrder
    company_id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    related_company_id?: SortOrder
    created_at?: SortOrder
    is_read?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    notification_id?: SortOrder
    company_id?: SortOrder
    related_company_id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IndustryCreateNestedOneWithoutCompaniesInput = {
    create?: XOR<IndustryCreateWithoutCompaniesInput, IndustryUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: IndustryCreateOrConnectWithoutCompaniesInput
    connect?: IndustryWhereUniqueInput
  }

  export type LocationCreateNestedOneWithoutCompaniesInput = {
    create?: XOR<LocationCreateWithoutCompaniesInput, LocationUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: LocationCreateOrConnectWithoutCompaniesInput
    connect?: LocationWhereUniqueInput
  }

  export type CompanyMatchesCreateNestedManyWithoutCompany1Input = {
    create?: XOR<CompanyMatchesCreateWithoutCompany1Input, CompanyMatchesUncheckedCreateWithoutCompany1Input> | CompanyMatchesCreateWithoutCompany1Input[] | CompanyMatchesUncheckedCreateWithoutCompany1Input[]
    connectOrCreate?: CompanyMatchesCreateOrConnectWithoutCompany1Input | CompanyMatchesCreateOrConnectWithoutCompany1Input[]
    createMany?: CompanyMatchesCreateManyCompany1InputEnvelope
    connect?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
  }

  export type CompanyMatchesCreateNestedManyWithoutCompany2Input = {
    create?: XOR<CompanyMatchesCreateWithoutCompany2Input, CompanyMatchesUncheckedCreateWithoutCompany2Input> | CompanyMatchesCreateWithoutCompany2Input[] | CompanyMatchesUncheckedCreateWithoutCompany2Input[]
    connectOrCreate?: CompanyMatchesCreateOrConnectWithoutCompany2Input | CompanyMatchesCreateOrConnectWithoutCompany2Input[]
    createMany?: CompanyMatchesCreateManyCompany2InputEnvelope
    connect?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
  }

  export type CompanyProductsCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CompanyProductsCreateWithoutCompanyInput, CompanyProductsUncheckedCreateWithoutCompanyInput> | CompanyProductsCreateWithoutCompanyInput[] | CompanyProductsUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyProductsCreateOrConnectWithoutCompanyInput | CompanyProductsCreateOrConnectWithoutCompanyInput[]
    createMany?: CompanyProductsCreateManyCompanyInputEnvelope
    connect?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
  }

  export type CompanyRegionsCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CompanyRegionsCreateWithoutCompanyInput, CompanyRegionsUncheckedCreateWithoutCompanyInput> | CompanyRegionsCreateWithoutCompanyInput[] | CompanyRegionsUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyRegionsCreateOrConnectWithoutCompanyInput | CompanyRegionsCreateOrConnectWithoutCompanyInput[]
    createMany?: CompanyRegionsCreateManyCompanyInputEnvelope
    connect?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
  }

  export type CompanyTargetsCreateNestedManyWithoutSourceInput = {
    create?: XOR<CompanyTargetsCreateWithoutSourceInput, CompanyTargetsUncheckedCreateWithoutSourceInput> | CompanyTargetsCreateWithoutSourceInput[] | CompanyTargetsUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: CompanyTargetsCreateOrConnectWithoutSourceInput | CompanyTargetsCreateOrConnectWithoutSourceInput[]
    createMany?: CompanyTargetsCreateManySourceInputEnvelope
    connect?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
  }

  export type CompanyTargetsCreateNestedManyWithoutTargetInput = {
    create?: XOR<CompanyTargetsCreateWithoutTargetInput, CompanyTargetsUncheckedCreateWithoutTargetInput> | CompanyTargetsCreateWithoutTargetInput[] | CompanyTargetsUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: CompanyTargetsCreateOrConnectWithoutTargetInput | CompanyTargetsCreateOrConnectWithoutTargetInput[]
    createMany?: CompanyTargetsCreateManyTargetInputEnvelope
    connect?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutCompanyInput = {
    create?: XOR<NotificationCreateWithoutCompanyInput, NotificationUncheckedCreateWithoutCompanyInput> | NotificationCreateWithoutCompanyInput[] | NotificationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutCompanyInput | NotificationCreateOrConnectWithoutCompanyInput[]
    createMany?: NotificationCreateManyCompanyInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutRelated_companyInput = {
    create?: XOR<NotificationCreateWithoutRelated_companyInput, NotificationUncheckedCreateWithoutRelated_companyInput> | NotificationCreateWithoutRelated_companyInput[] | NotificationUncheckedCreateWithoutRelated_companyInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutRelated_companyInput | NotificationCreateOrConnectWithoutRelated_companyInput[]
    createMany?: NotificationCreateManyRelated_companyInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type CompanyMatchesUncheckedCreateNestedManyWithoutCompany1Input = {
    create?: XOR<CompanyMatchesCreateWithoutCompany1Input, CompanyMatchesUncheckedCreateWithoutCompany1Input> | CompanyMatchesCreateWithoutCompany1Input[] | CompanyMatchesUncheckedCreateWithoutCompany1Input[]
    connectOrCreate?: CompanyMatchesCreateOrConnectWithoutCompany1Input | CompanyMatchesCreateOrConnectWithoutCompany1Input[]
    createMany?: CompanyMatchesCreateManyCompany1InputEnvelope
    connect?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
  }

  export type CompanyMatchesUncheckedCreateNestedManyWithoutCompany2Input = {
    create?: XOR<CompanyMatchesCreateWithoutCompany2Input, CompanyMatchesUncheckedCreateWithoutCompany2Input> | CompanyMatchesCreateWithoutCompany2Input[] | CompanyMatchesUncheckedCreateWithoutCompany2Input[]
    connectOrCreate?: CompanyMatchesCreateOrConnectWithoutCompany2Input | CompanyMatchesCreateOrConnectWithoutCompany2Input[]
    createMany?: CompanyMatchesCreateManyCompany2InputEnvelope
    connect?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
  }

  export type CompanyProductsUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CompanyProductsCreateWithoutCompanyInput, CompanyProductsUncheckedCreateWithoutCompanyInput> | CompanyProductsCreateWithoutCompanyInput[] | CompanyProductsUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyProductsCreateOrConnectWithoutCompanyInput | CompanyProductsCreateOrConnectWithoutCompanyInput[]
    createMany?: CompanyProductsCreateManyCompanyInputEnvelope
    connect?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
  }

  export type CompanyRegionsUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CompanyRegionsCreateWithoutCompanyInput, CompanyRegionsUncheckedCreateWithoutCompanyInput> | CompanyRegionsCreateWithoutCompanyInput[] | CompanyRegionsUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyRegionsCreateOrConnectWithoutCompanyInput | CompanyRegionsCreateOrConnectWithoutCompanyInput[]
    createMany?: CompanyRegionsCreateManyCompanyInputEnvelope
    connect?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
  }

  export type CompanyTargetsUncheckedCreateNestedManyWithoutSourceInput = {
    create?: XOR<CompanyTargetsCreateWithoutSourceInput, CompanyTargetsUncheckedCreateWithoutSourceInput> | CompanyTargetsCreateWithoutSourceInput[] | CompanyTargetsUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: CompanyTargetsCreateOrConnectWithoutSourceInput | CompanyTargetsCreateOrConnectWithoutSourceInput[]
    createMany?: CompanyTargetsCreateManySourceInputEnvelope
    connect?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
  }

  export type CompanyTargetsUncheckedCreateNestedManyWithoutTargetInput = {
    create?: XOR<CompanyTargetsCreateWithoutTargetInput, CompanyTargetsUncheckedCreateWithoutTargetInput> | CompanyTargetsCreateWithoutTargetInput[] | CompanyTargetsUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: CompanyTargetsCreateOrConnectWithoutTargetInput | CompanyTargetsCreateOrConnectWithoutTargetInput[]
    createMany?: CompanyTargetsCreateManyTargetInputEnvelope
    connect?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<NotificationCreateWithoutCompanyInput, NotificationUncheckedCreateWithoutCompanyInput> | NotificationCreateWithoutCompanyInput[] | NotificationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutCompanyInput | NotificationCreateOrConnectWithoutCompanyInput[]
    createMany?: NotificationCreateManyCompanyInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutRelated_companyInput = {
    create?: XOR<NotificationCreateWithoutRelated_companyInput, NotificationUncheckedCreateWithoutRelated_companyInput> | NotificationCreateWithoutRelated_companyInput[] | NotificationUncheckedCreateWithoutRelated_companyInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutRelated_companyInput | NotificationCreateOrConnectWithoutRelated_companyInput[]
    createMany?: NotificationCreateManyRelated_companyInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IndustryUpdateOneWithoutCompaniesNestedInput = {
    create?: XOR<IndustryCreateWithoutCompaniesInput, IndustryUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: IndustryCreateOrConnectWithoutCompaniesInput
    upsert?: IndustryUpsertWithoutCompaniesInput
    disconnect?: IndustryWhereInput | boolean
    delete?: IndustryWhereInput | boolean
    connect?: IndustryWhereUniqueInput
    update?: XOR<XOR<IndustryUpdateToOneWithWhereWithoutCompaniesInput, IndustryUpdateWithoutCompaniesInput>, IndustryUncheckedUpdateWithoutCompaniesInput>
  }

  export type LocationUpdateOneWithoutCompaniesNestedInput = {
    create?: XOR<LocationCreateWithoutCompaniesInput, LocationUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: LocationCreateOrConnectWithoutCompaniesInput
    upsert?: LocationUpsertWithoutCompaniesInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutCompaniesInput, LocationUpdateWithoutCompaniesInput>, LocationUncheckedUpdateWithoutCompaniesInput>
  }

  export type CompanyMatchesUpdateManyWithoutCompany1NestedInput = {
    create?: XOR<CompanyMatchesCreateWithoutCompany1Input, CompanyMatchesUncheckedCreateWithoutCompany1Input> | CompanyMatchesCreateWithoutCompany1Input[] | CompanyMatchesUncheckedCreateWithoutCompany1Input[]
    connectOrCreate?: CompanyMatchesCreateOrConnectWithoutCompany1Input | CompanyMatchesCreateOrConnectWithoutCompany1Input[]
    upsert?: CompanyMatchesUpsertWithWhereUniqueWithoutCompany1Input | CompanyMatchesUpsertWithWhereUniqueWithoutCompany1Input[]
    createMany?: CompanyMatchesCreateManyCompany1InputEnvelope
    set?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    disconnect?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    delete?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    connect?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    update?: CompanyMatchesUpdateWithWhereUniqueWithoutCompany1Input | CompanyMatchesUpdateWithWhereUniqueWithoutCompany1Input[]
    updateMany?: CompanyMatchesUpdateManyWithWhereWithoutCompany1Input | CompanyMatchesUpdateManyWithWhereWithoutCompany1Input[]
    deleteMany?: CompanyMatchesScalarWhereInput | CompanyMatchesScalarWhereInput[]
  }

  export type CompanyMatchesUpdateManyWithoutCompany2NestedInput = {
    create?: XOR<CompanyMatchesCreateWithoutCompany2Input, CompanyMatchesUncheckedCreateWithoutCompany2Input> | CompanyMatchesCreateWithoutCompany2Input[] | CompanyMatchesUncheckedCreateWithoutCompany2Input[]
    connectOrCreate?: CompanyMatchesCreateOrConnectWithoutCompany2Input | CompanyMatchesCreateOrConnectWithoutCompany2Input[]
    upsert?: CompanyMatchesUpsertWithWhereUniqueWithoutCompany2Input | CompanyMatchesUpsertWithWhereUniqueWithoutCompany2Input[]
    createMany?: CompanyMatchesCreateManyCompany2InputEnvelope
    set?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    disconnect?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    delete?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    connect?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    update?: CompanyMatchesUpdateWithWhereUniqueWithoutCompany2Input | CompanyMatchesUpdateWithWhereUniqueWithoutCompany2Input[]
    updateMany?: CompanyMatchesUpdateManyWithWhereWithoutCompany2Input | CompanyMatchesUpdateManyWithWhereWithoutCompany2Input[]
    deleteMany?: CompanyMatchesScalarWhereInput | CompanyMatchesScalarWhereInput[]
  }

  export type CompanyProductsUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CompanyProductsCreateWithoutCompanyInput, CompanyProductsUncheckedCreateWithoutCompanyInput> | CompanyProductsCreateWithoutCompanyInput[] | CompanyProductsUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyProductsCreateOrConnectWithoutCompanyInput | CompanyProductsCreateOrConnectWithoutCompanyInput[]
    upsert?: CompanyProductsUpsertWithWhereUniqueWithoutCompanyInput | CompanyProductsUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CompanyProductsCreateManyCompanyInputEnvelope
    set?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    disconnect?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    delete?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    connect?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    update?: CompanyProductsUpdateWithWhereUniqueWithoutCompanyInput | CompanyProductsUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CompanyProductsUpdateManyWithWhereWithoutCompanyInput | CompanyProductsUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CompanyProductsScalarWhereInput | CompanyProductsScalarWhereInput[]
  }

  export type CompanyRegionsUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CompanyRegionsCreateWithoutCompanyInput, CompanyRegionsUncheckedCreateWithoutCompanyInput> | CompanyRegionsCreateWithoutCompanyInput[] | CompanyRegionsUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyRegionsCreateOrConnectWithoutCompanyInput | CompanyRegionsCreateOrConnectWithoutCompanyInput[]
    upsert?: CompanyRegionsUpsertWithWhereUniqueWithoutCompanyInput | CompanyRegionsUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CompanyRegionsCreateManyCompanyInputEnvelope
    set?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    disconnect?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    delete?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    connect?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    update?: CompanyRegionsUpdateWithWhereUniqueWithoutCompanyInput | CompanyRegionsUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CompanyRegionsUpdateManyWithWhereWithoutCompanyInput | CompanyRegionsUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CompanyRegionsScalarWhereInput | CompanyRegionsScalarWhereInput[]
  }

  export type CompanyTargetsUpdateManyWithoutSourceNestedInput = {
    create?: XOR<CompanyTargetsCreateWithoutSourceInput, CompanyTargetsUncheckedCreateWithoutSourceInput> | CompanyTargetsCreateWithoutSourceInput[] | CompanyTargetsUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: CompanyTargetsCreateOrConnectWithoutSourceInput | CompanyTargetsCreateOrConnectWithoutSourceInput[]
    upsert?: CompanyTargetsUpsertWithWhereUniqueWithoutSourceInput | CompanyTargetsUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: CompanyTargetsCreateManySourceInputEnvelope
    set?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    disconnect?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    delete?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    connect?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    update?: CompanyTargetsUpdateWithWhereUniqueWithoutSourceInput | CompanyTargetsUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: CompanyTargetsUpdateManyWithWhereWithoutSourceInput | CompanyTargetsUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: CompanyTargetsScalarWhereInput | CompanyTargetsScalarWhereInput[]
  }

  export type CompanyTargetsUpdateManyWithoutTargetNestedInput = {
    create?: XOR<CompanyTargetsCreateWithoutTargetInput, CompanyTargetsUncheckedCreateWithoutTargetInput> | CompanyTargetsCreateWithoutTargetInput[] | CompanyTargetsUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: CompanyTargetsCreateOrConnectWithoutTargetInput | CompanyTargetsCreateOrConnectWithoutTargetInput[]
    upsert?: CompanyTargetsUpsertWithWhereUniqueWithoutTargetInput | CompanyTargetsUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: CompanyTargetsCreateManyTargetInputEnvelope
    set?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    disconnect?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    delete?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    connect?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    update?: CompanyTargetsUpdateWithWhereUniqueWithoutTargetInput | CompanyTargetsUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: CompanyTargetsUpdateManyWithWhereWithoutTargetInput | CompanyTargetsUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: CompanyTargetsScalarWhereInput | CompanyTargetsScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<NotificationCreateWithoutCompanyInput, NotificationUncheckedCreateWithoutCompanyInput> | NotificationCreateWithoutCompanyInput[] | NotificationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutCompanyInput | NotificationCreateOrConnectWithoutCompanyInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutCompanyInput | NotificationUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: NotificationCreateManyCompanyInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutCompanyInput | NotificationUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutCompanyInput | NotificationUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutRelated_companyNestedInput = {
    create?: XOR<NotificationCreateWithoutRelated_companyInput, NotificationUncheckedCreateWithoutRelated_companyInput> | NotificationCreateWithoutRelated_companyInput[] | NotificationUncheckedCreateWithoutRelated_companyInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutRelated_companyInput | NotificationCreateOrConnectWithoutRelated_companyInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutRelated_companyInput | NotificationUpsertWithWhereUniqueWithoutRelated_companyInput[]
    createMany?: NotificationCreateManyRelated_companyInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutRelated_companyInput | NotificationUpdateWithWhereUniqueWithoutRelated_companyInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutRelated_companyInput | NotificationUpdateManyWithWhereWithoutRelated_companyInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CompanyMatchesUncheckedUpdateManyWithoutCompany1NestedInput = {
    create?: XOR<CompanyMatchesCreateWithoutCompany1Input, CompanyMatchesUncheckedCreateWithoutCompany1Input> | CompanyMatchesCreateWithoutCompany1Input[] | CompanyMatchesUncheckedCreateWithoutCompany1Input[]
    connectOrCreate?: CompanyMatchesCreateOrConnectWithoutCompany1Input | CompanyMatchesCreateOrConnectWithoutCompany1Input[]
    upsert?: CompanyMatchesUpsertWithWhereUniqueWithoutCompany1Input | CompanyMatchesUpsertWithWhereUniqueWithoutCompany1Input[]
    createMany?: CompanyMatchesCreateManyCompany1InputEnvelope
    set?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    disconnect?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    delete?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    connect?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    update?: CompanyMatchesUpdateWithWhereUniqueWithoutCompany1Input | CompanyMatchesUpdateWithWhereUniqueWithoutCompany1Input[]
    updateMany?: CompanyMatchesUpdateManyWithWhereWithoutCompany1Input | CompanyMatchesUpdateManyWithWhereWithoutCompany1Input[]
    deleteMany?: CompanyMatchesScalarWhereInput | CompanyMatchesScalarWhereInput[]
  }

  export type CompanyMatchesUncheckedUpdateManyWithoutCompany2NestedInput = {
    create?: XOR<CompanyMatchesCreateWithoutCompany2Input, CompanyMatchesUncheckedCreateWithoutCompany2Input> | CompanyMatchesCreateWithoutCompany2Input[] | CompanyMatchesUncheckedCreateWithoutCompany2Input[]
    connectOrCreate?: CompanyMatchesCreateOrConnectWithoutCompany2Input | CompanyMatchesCreateOrConnectWithoutCompany2Input[]
    upsert?: CompanyMatchesUpsertWithWhereUniqueWithoutCompany2Input | CompanyMatchesUpsertWithWhereUniqueWithoutCompany2Input[]
    createMany?: CompanyMatchesCreateManyCompany2InputEnvelope
    set?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    disconnect?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    delete?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    connect?: CompanyMatchesWhereUniqueInput | CompanyMatchesWhereUniqueInput[]
    update?: CompanyMatchesUpdateWithWhereUniqueWithoutCompany2Input | CompanyMatchesUpdateWithWhereUniqueWithoutCompany2Input[]
    updateMany?: CompanyMatchesUpdateManyWithWhereWithoutCompany2Input | CompanyMatchesUpdateManyWithWhereWithoutCompany2Input[]
    deleteMany?: CompanyMatchesScalarWhereInput | CompanyMatchesScalarWhereInput[]
  }

  export type CompanyProductsUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CompanyProductsCreateWithoutCompanyInput, CompanyProductsUncheckedCreateWithoutCompanyInput> | CompanyProductsCreateWithoutCompanyInput[] | CompanyProductsUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyProductsCreateOrConnectWithoutCompanyInput | CompanyProductsCreateOrConnectWithoutCompanyInput[]
    upsert?: CompanyProductsUpsertWithWhereUniqueWithoutCompanyInput | CompanyProductsUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CompanyProductsCreateManyCompanyInputEnvelope
    set?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    disconnect?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    delete?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    connect?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    update?: CompanyProductsUpdateWithWhereUniqueWithoutCompanyInput | CompanyProductsUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CompanyProductsUpdateManyWithWhereWithoutCompanyInput | CompanyProductsUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CompanyProductsScalarWhereInput | CompanyProductsScalarWhereInput[]
  }

  export type CompanyRegionsUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CompanyRegionsCreateWithoutCompanyInput, CompanyRegionsUncheckedCreateWithoutCompanyInput> | CompanyRegionsCreateWithoutCompanyInput[] | CompanyRegionsUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyRegionsCreateOrConnectWithoutCompanyInput | CompanyRegionsCreateOrConnectWithoutCompanyInput[]
    upsert?: CompanyRegionsUpsertWithWhereUniqueWithoutCompanyInput | CompanyRegionsUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CompanyRegionsCreateManyCompanyInputEnvelope
    set?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    disconnect?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    delete?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    connect?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    update?: CompanyRegionsUpdateWithWhereUniqueWithoutCompanyInput | CompanyRegionsUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CompanyRegionsUpdateManyWithWhereWithoutCompanyInput | CompanyRegionsUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CompanyRegionsScalarWhereInput | CompanyRegionsScalarWhereInput[]
  }

  export type CompanyTargetsUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: XOR<CompanyTargetsCreateWithoutSourceInput, CompanyTargetsUncheckedCreateWithoutSourceInput> | CompanyTargetsCreateWithoutSourceInput[] | CompanyTargetsUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: CompanyTargetsCreateOrConnectWithoutSourceInput | CompanyTargetsCreateOrConnectWithoutSourceInput[]
    upsert?: CompanyTargetsUpsertWithWhereUniqueWithoutSourceInput | CompanyTargetsUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: CompanyTargetsCreateManySourceInputEnvelope
    set?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    disconnect?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    delete?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    connect?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    update?: CompanyTargetsUpdateWithWhereUniqueWithoutSourceInput | CompanyTargetsUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: CompanyTargetsUpdateManyWithWhereWithoutSourceInput | CompanyTargetsUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: CompanyTargetsScalarWhereInput | CompanyTargetsScalarWhereInput[]
  }

  export type CompanyTargetsUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: XOR<CompanyTargetsCreateWithoutTargetInput, CompanyTargetsUncheckedCreateWithoutTargetInput> | CompanyTargetsCreateWithoutTargetInput[] | CompanyTargetsUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: CompanyTargetsCreateOrConnectWithoutTargetInput | CompanyTargetsCreateOrConnectWithoutTargetInput[]
    upsert?: CompanyTargetsUpsertWithWhereUniqueWithoutTargetInput | CompanyTargetsUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: CompanyTargetsCreateManyTargetInputEnvelope
    set?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    disconnect?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    delete?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    connect?: CompanyTargetsWhereUniqueInput | CompanyTargetsWhereUniqueInput[]
    update?: CompanyTargetsUpdateWithWhereUniqueWithoutTargetInput | CompanyTargetsUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: CompanyTargetsUpdateManyWithWhereWithoutTargetInput | CompanyTargetsUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: CompanyTargetsScalarWhereInput | CompanyTargetsScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<NotificationCreateWithoutCompanyInput, NotificationUncheckedCreateWithoutCompanyInput> | NotificationCreateWithoutCompanyInput[] | NotificationUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutCompanyInput | NotificationCreateOrConnectWithoutCompanyInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutCompanyInput | NotificationUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: NotificationCreateManyCompanyInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutCompanyInput | NotificationUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutCompanyInput | NotificationUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutRelated_companyNestedInput = {
    create?: XOR<NotificationCreateWithoutRelated_companyInput, NotificationUncheckedCreateWithoutRelated_companyInput> | NotificationCreateWithoutRelated_companyInput[] | NotificationUncheckedCreateWithoutRelated_companyInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutRelated_companyInput | NotificationCreateOrConnectWithoutRelated_companyInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutRelated_companyInput | NotificationUpsertWithWhereUniqueWithoutRelated_companyInput[]
    createMany?: NotificationCreateManyRelated_companyInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutRelated_companyInput | NotificationUpdateWithWhereUniqueWithoutRelated_companyInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutRelated_companyInput | NotificationUpdateManyWithWhereWithoutRelated_companyInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type CompanyCreateNestedManyWithoutIndustryInput = {
    create?: XOR<CompanyCreateWithoutIndustryInput, CompanyUncheckedCreateWithoutIndustryInput> | CompanyCreateWithoutIndustryInput[] | CompanyUncheckedCreateWithoutIndustryInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutIndustryInput | CompanyCreateOrConnectWithoutIndustryInput[]
    createMany?: CompanyCreateManyIndustryInputEnvelope
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
  }

  export type CompanyUncheckedCreateNestedManyWithoutIndustryInput = {
    create?: XOR<CompanyCreateWithoutIndustryInput, CompanyUncheckedCreateWithoutIndustryInput> | CompanyCreateWithoutIndustryInput[] | CompanyUncheckedCreateWithoutIndustryInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutIndustryInput | CompanyCreateOrConnectWithoutIndustryInput[]
    createMany?: CompanyCreateManyIndustryInputEnvelope
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
  }

  export type CompanyUpdateManyWithoutIndustryNestedInput = {
    create?: XOR<CompanyCreateWithoutIndustryInput, CompanyUncheckedCreateWithoutIndustryInput> | CompanyCreateWithoutIndustryInput[] | CompanyUncheckedCreateWithoutIndustryInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutIndustryInput | CompanyCreateOrConnectWithoutIndustryInput[]
    upsert?: CompanyUpsertWithWhereUniqueWithoutIndustryInput | CompanyUpsertWithWhereUniqueWithoutIndustryInput[]
    createMany?: CompanyCreateManyIndustryInputEnvelope
    set?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    disconnect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    delete?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    update?: CompanyUpdateWithWhereUniqueWithoutIndustryInput | CompanyUpdateWithWhereUniqueWithoutIndustryInput[]
    updateMany?: CompanyUpdateManyWithWhereWithoutIndustryInput | CompanyUpdateManyWithWhereWithoutIndustryInput[]
    deleteMany?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
  }

  export type CompanyUncheckedUpdateManyWithoutIndustryNestedInput = {
    create?: XOR<CompanyCreateWithoutIndustryInput, CompanyUncheckedCreateWithoutIndustryInput> | CompanyCreateWithoutIndustryInput[] | CompanyUncheckedCreateWithoutIndustryInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutIndustryInput | CompanyCreateOrConnectWithoutIndustryInput[]
    upsert?: CompanyUpsertWithWhereUniqueWithoutIndustryInput | CompanyUpsertWithWhereUniqueWithoutIndustryInput[]
    createMany?: CompanyCreateManyIndustryInputEnvelope
    set?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    disconnect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    delete?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    update?: CompanyUpdateWithWhereUniqueWithoutIndustryInput | CompanyUpdateWithWhereUniqueWithoutIndustryInput[]
    updateMany?: CompanyUpdateManyWithWhereWithoutIndustryInput | CompanyUpdateManyWithWhereWithoutIndustryInput[]
    deleteMany?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
  }

  export type CompanyCreateNestedManyWithoutLocationInput = {
    create?: XOR<CompanyCreateWithoutLocationInput, CompanyUncheckedCreateWithoutLocationInput> | CompanyCreateWithoutLocationInput[] | CompanyUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutLocationInput | CompanyCreateOrConnectWithoutLocationInput[]
    createMany?: CompanyCreateManyLocationInputEnvelope
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
  }

  export type CompanyUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<CompanyCreateWithoutLocationInput, CompanyUncheckedCreateWithoutLocationInput> | CompanyCreateWithoutLocationInput[] | CompanyUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutLocationInput | CompanyCreateOrConnectWithoutLocationInput[]
    createMany?: CompanyCreateManyLocationInputEnvelope
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
  }

  export type CompanyUpdateManyWithoutLocationNestedInput = {
    create?: XOR<CompanyCreateWithoutLocationInput, CompanyUncheckedCreateWithoutLocationInput> | CompanyCreateWithoutLocationInput[] | CompanyUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutLocationInput | CompanyCreateOrConnectWithoutLocationInput[]
    upsert?: CompanyUpsertWithWhereUniqueWithoutLocationInput | CompanyUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: CompanyCreateManyLocationInputEnvelope
    set?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    disconnect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    delete?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    update?: CompanyUpdateWithWhereUniqueWithoutLocationInput | CompanyUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: CompanyUpdateManyWithWhereWithoutLocationInput | CompanyUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
  }

  export type CompanyUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<CompanyCreateWithoutLocationInput, CompanyUncheckedCreateWithoutLocationInput> | CompanyCreateWithoutLocationInput[] | CompanyUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: CompanyCreateOrConnectWithoutLocationInput | CompanyCreateOrConnectWithoutLocationInput[]
    upsert?: CompanyUpsertWithWhereUniqueWithoutLocationInput | CompanyUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: CompanyCreateManyLocationInputEnvelope
    set?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    disconnect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    delete?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    connect?: CompanyWhereUniqueInput | CompanyWhereUniqueInput[]
    update?: CompanyUpdateWithWhereUniqueWithoutLocationInput | CompanyUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: CompanyUpdateManyWithWhereWithoutLocationInput | CompanyUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
  }

  export type CompanyProductsCreateNestedManyWithoutProductInput = {
    create?: XOR<CompanyProductsCreateWithoutProductInput, CompanyProductsUncheckedCreateWithoutProductInput> | CompanyProductsCreateWithoutProductInput[] | CompanyProductsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CompanyProductsCreateOrConnectWithoutProductInput | CompanyProductsCreateOrConnectWithoutProductInput[]
    createMany?: CompanyProductsCreateManyProductInputEnvelope
    connect?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
  }

  export type CompanyProductsUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<CompanyProductsCreateWithoutProductInput, CompanyProductsUncheckedCreateWithoutProductInput> | CompanyProductsCreateWithoutProductInput[] | CompanyProductsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CompanyProductsCreateOrConnectWithoutProductInput | CompanyProductsCreateOrConnectWithoutProductInput[]
    createMany?: CompanyProductsCreateManyProductInputEnvelope
    connect?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
  }

  export type CompanyProductsUpdateManyWithoutProductNestedInput = {
    create?: XOR<CompanyProductsCreateWithoutProductInput, CompanyProductsUncheckedCreateWithoutProductInput> | CompanyProductsCreateWithoutProductInput[] | CompanyProductsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CompanyProductsCreateOrConnectWithoutProductInput | CompanyProductsCreateOrConnectWithoutProductInput[]
    upsert?: CompanyProductsUpsertWithWhereUniqueWithoutProductInput | CompanyProductsUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CompanyProductsCreateManyProductInputEnvelope
    set?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    disconnect?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    delete?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    connect?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    update?: CompanyProductsUpdateWithWhereUniqueWithoutProductInput | CompanyProductsUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CompanyProductsUpdateManyWithWhereWithoutProductInput | CompanyProductsUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CompanyProductsScalarWhereInput | CompanyProductsScalarWhereInput[]
  }

  export type CompanyProductsUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<CompanyProductsCreateWithoutProductInput, CompanyProductsUncheckedCreateWithoutProductInput> | CompanyProductsCreateWithoutProductInput[] | CompanyProductsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CompanyProductsCreateOrConnectWithoutProductInput | CompanyProductsCreateOrConnectWithoutProductInput[]
    upsert?: CompanyProductsUpsertWithWhereUniqueWithoutProductInput | CompanyProductsUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CompanyProductsCreateManyProductInputEnvelope
    set?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    disconnect?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    delete?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    connect?: CompanyProductsWhereUniqueInput | CompanyProductsWhereUniqueInput[]
    update?: CompanyProductsUpdateWithWhereUniqueWithoutProductInput | CompanyProductsUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CompanyProductsUpdateManyWithWhereWithoutProductInput | CompanyProductsUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CompanyProductsScalarWhereInput | CompanyProductsScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutProductsInput = {
    create?: XOR<CompanyCreateWithoutProductsInput, CompanyUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutProductsInput
    connect?: CompanyWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutCompaniesInput = {
    create?: XOR<ProductCreateWithoutCompaniesInput, ProductUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCompaniesInput
    connect?: ProductWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CompanyCreateWithoutProductsInput, CompanyUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutProductsInput
    upsert?: CompanyUpsertWithoutProductsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutProductsInput, CompanyUpdateWithoutProductsInput>, CompanyUncheckedUpdateWithoutProductsInput>
  }

  export type ProductUpdateOneRequiredWithoutCompaniesNestedInput = {
    create?: XOR<ProductCreateWithoutCompaniesInput, ProductUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCompaniesInput
    upsert?: ProductUpsertWithoutCompaniesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutCompaniesInput, ProductUpdateWithoutCompaniesInput>, ProductUncheckedUpdateWithoutCompaniesInput>
  }

  export type CompanyRegionsCreateNestedManyWithoutRegionInput = {
    create?: XOR<CompanyRegionsCreateWithoutRegionInput, CompanyRegionsUncheckedCreateWithoutRegionInput> | CompanyRegionsCreateWithoutRegionInput[] | CompanyRegionsUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CompanyRegionsCreateOrConnectWithoutRegionInput | CompanyRegionsCreateOrConnectWithoutRegionInput[]
    createMany?: CompanyRegionsCreateManyRegionInputEnvelope
    connect?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
  }

  export type CompanyRegionsUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<CompanyRegionsCreateWithoutRegionInput, CompanyRegionsUncheckedCreateWithoutRegionInput> | CompanyRegionsCreateWithoutRegionInput[] | CompanyRegionsUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CompanyRegionsCreateOrConnectWithoutRegionInput | CompanyRegionsCreateOrConnectWithoutRegionInput[]
    createMany?: CompanyRegionsCreateManyRegionInputEnvelope
    connect?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
  }

  export type CompanyRegionsUpdateManyWithoutRegionNestedInput = {
    create?: XOR<CompanyRegionsCreateWithoutRegionInput, CompanyRegionsUncheckedCreateWithoutRegionInput> | CompanyRegionsCreateWithoutRegionInput[] | CompanyRegionsUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CompanyRegionsCreateOrConnectWithoutRegionInput | CompanyRegionsCreateOrConnectWithoutRegionInput[]
    upsert?: CompanyRegionsUpsertWithWhereUniqueWithoutRegionInput | CompanyRegionsUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: CompanyRegionsCreateManyRegionInputEnvelope
    set?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    disconnect?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    delete?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    connect?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    update?: CompanyRegionsUpdateWithWhereUniqueWithoutRegionInput | CompanyRegionsUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: CompanyRegionsUpdateManyWithWhereWithoutRegionInput | CompanyRegionsUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: CompanyRegionsScalarWhereInput | CompanyRegionsScalarWhereInput[]
  }

  export type CompanyRegionsUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<CompanyRegionsCreateWithoutRegionInput, CompanyRegionsUncheckedCreateWithoutRegionInput> | CompanyRegionsCreateWithoutRegionInput[] | CompanyRegionsUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CompanyRegionsCreateOrConnectWithoutRegionInput | CompanyRegionsCreateOrConnectWithoutRegionInput[]
    upsert?: CompanyRegionsUpsertWithWhereUniqueWithoutRegionInput | CompanyRegionsUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: CompanyRegionsCreateManyRegionInputEnvelope
    set?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    disconnect?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    delete?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    connect?: CompanyRegionsWhereUniqueInput | CompanyRegionsWhereUniqueInput[]
    update?: CompanyRegionsUpdateWithWhereUniqueWithoutRegionInput | CompanyRegionsUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: CompanyRegionsUpdateManyWithWhereWithoutRegionInput | CompanyRegionsUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: CompanyRegionsScalarWhereInput | CompanyRegionsScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutRegionsInput = {
    create?: XOR<CompanyCreateWithoutRegionsInput, CompanyUncheckedCreateWithoutRegionsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutRegionsInput
    connect?: CompanyWhereUniqueInput
  }

  export type RegionCreateNestedOneWithoutCompaniesInput = {
    create?: XOR<RegionCreateWithoutCompaniesInput, RegionUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: RegionCreateOrConnectWithoutCompaniesInput
    connect?: RegionWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutRegionsNestedInput = {
    create?: XOR<CompanyCreateWithoutRegionsInput, CompanyUncheckedCreateWithoutRegionsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutRegionsInput
    upsert?: CompanyUpsertWithoutRegionsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutRegionsInput, CompanyUpdateWithoutRegionsInput>, CompanyUncheckedUpdateWithoutRegionsInput>
  }

  export type RegionUpdateOneRequiredWithoutCompaniesNestedInput = {
    create?: XOR<RegionCreateWithoutCompaniesInput, RegionUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: RegionCreateOrConnectWithoutCompaniesInput
    upsert?: RegionUpsertWithoutCompaniesInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutCompaniesInput, RegionUpdateWithoutCompaniesInput>, RegionUncheckedUpdateWithoutCompaniesInput>
  }

  export type CompanyCreateNestedOneWithoutTargetsInput = {
    create?: XOR<CompanyCreateWithoutTargetsInput, CompanyUncheckedCreateWithoutTargetsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTargetsInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutTarget_ofInput = {
    create?: XOR<CompanyCreateWithoutTarget_ofInput, CompanyUncheckedCreateWithoutTarget_ofInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTarget_ofInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutTargetsNestedInput = {
    create?: XOR<CompanyCreateWithoutTargetsInput, CompanyUncheckedCreateWithoutTargetsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTargetsInput
    upsert?: CompanyUpsertWithoutTargetsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutTargetsInput, CompanyUpdateWithoutTargetsInput>, CompanyUncheckedUpdateWithoutTargetsInput>
  }

  export type CompanyUpdateOneRequiredWithoutTarget_ofNestedInput = {
    create?: XOR<CompanyCreateWithoutTarget_ofInput, CompanyUncheckedCreateWithoutTarget_ofInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTarget_ofInput
    upsert?: CompanyUpsertWithoutTarget_ofInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutTarget_ofInput, CompanyUpdateWithoutTarget_ofInput>, CompanyUncheckedUpdateWithoutTarget_ofInput>
  }

  export type CompanyCreateNestedOneWithoutMatchesInput = {
    create?: XOR<CompanyCreateWithoutMatchesInput, CompanyUncheckedCreateWithoutMatchesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutMatchesInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutMatched_withInput = {
    create?: XOR<CompanyCreateWithoutMatched_withInput, CompanyUncheckedCreateWithoutMatched_withInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutMatched_withInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutMatchesNestedInput = {
    create?: XOR<CompanyCreateWithoutMatchesInput, CompanyUncheckedCreateWithoutMatchesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutMatchesInput
    upsert?: CompanyUpsertWithoutMatchesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutMatchesInput, CompanyUpdateWithoutMatchesInput>, CompanyUncheckedUpdateWithoutMatchesInput>
  }

  export type CompanyUpdateOneRequiredWithoutMatched_withNestedInput = {
    create?: XOR<CompanyCreateWithoutMatched_withInput, CompanyUncheckedCreateWithoutMatched_withInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutMatched_withInput
    upsert?: CompanyUpsertWithoutMatched_withInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutMatched_withInput, CompanyUpdateWithoutMatched_withInput>, CompanyUncheckedUpdateWithoutMatched_withInput>
  }

  export type CompanyCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<CompanyCreateWithoutNotificationsInput, CompanyUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutNotificationsInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutTriggered_notificationsInput = {
    create?: XOR<CompanyCreateWithoutTriggered_notificationsInput, CompanyUncheckedCreateWithoutTriggered_notificationsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTriggered_notificationsInput
    connect?: CompanyWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CompanyUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<CompanyCreateWithoutNotificationsInput, CompanyUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutNotificationsInput
    upsert?: CompanyUpsertWithoutNotificationsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutNotificationsInput, CompanyUpdateWithoutNotificationsInput>, CompanyUncheckedUpdateWithoutNotificationsInput>
  }

  export type CompanyUpdateOneWithoutTriggered_notificationsNestedInput = {
    create?: XOR<CompanyCreateWithoutTriggered_notificationsInput, CompanyUncheckedCreateWithoutTriggered_notificationsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTriggered_notificationsInput
    upsert?: CompanyUpsertWithoutTriggered_notificationsInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutTriggered_notificationsInput, CompanyUpdateWithoutTriggered_notificationsInput>, CompanyUncheckedUpdateWithoutTriggered_notificationsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IndustryCreateWithoutCompaniesInput = {
    industry_name: string
  }

  export type IndustryUncheckedCreateWithoutCompaniesInput = {
    industry_id?: number
    industry_name: string
  }

  export type IndustryCreateOrConnectWithoutCompaniesInput = {
    where: IndustryWhereUniqueInput
    create: XOR<IndustryCreateWithoutCompaniesInput, IndustryUncheckedCreateWithoutCompaniesInput>
  }

  export type LocationCreateWithoutCompaniesInput = {
    country: string
  }

  export type LocationUncheckedCreateWithoutCompaniesInput = {
    location_id?: number
    country: string
  }

  export type LocationCreateOrConnectWithoutCompaniesInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutCompaniesInput, LocationUncheckedCreateWithoutCompaniesInput>
  }

  export type CompanyMatchesCreateWithoutCompany1Input = {
    matched_at?: Date | string
    match_type?: string | null
    company2: CompanyCreateNestedOneWithoutMatched_withInput
  }

  export type CompanyMatchesUncheckedCreateWithoutCompany1Input = {
    company2_id: number
    matched_at?: Date | string
    match_type?: string | null
  }

  export type CompanyMatchesCreateOrConnectWithoutCompany1Input = {
    where: CompanyMatchesWhereUniqueInput
    create: XOR<CompanyMatchesCreateWithoutCompany1Input, CompanyMatchesUncheckedCreateWithoutCompany1Input>
  }

  export type CompanyMatchesCreateManyCompany1InputEnvelope = {
    data: CompanyMatchesCreateManyCompany1Input | CompanyMatchesCreateManyCompany1Input[]
    skipDuplicates?: boolean
  }

  export type CompanyMatchesCreateWithoutCompany2Input = {
    matched_at?: Date | string
    match_type?: string | null
    company1: CompanyCreateNestedOneWithoutMatchesInput
  }

  export type CompanyMatchesUncheckedCreateWithoutCompany2Input = {
    company1_id: number
    matched_at?: Date | string
    match_type?: string | null
  }

  export type CompanyMatchesCreateOrConnectWithoutCompany2Input = {
    where: CompanyMatchesWhereUniqueInput
    create: XOR<CompanyMatchesCreateWithoutCompany2Input, CompanyMatchesUncheckedCreateWithoutCompany2Input>
  }

  export type CompanyMatchesCreateManyCompany2InputEnvelope = {
    data: CompanyMatchesCreateManyCompany2Input | CompanyMatchesCreateManyCompany2Input[]
    skipDuplicates?: boolean
  }

  export type CompanyProductsCreateWithoutCompanyInput = {
    product: ProductCreateNestedOneWithoutCompaniesInput
  }

  export type CompanyProductsUncheckedCreateWithoutCompanyInput = {
    product_id: number
  }

  export type CompanyProductsCreateOrConnectWithoutCompanyInput = {
    where: CompanyProductsWhereUniqueInput
    create: XOR<CompanyProductsCreateWithoutCompanyInput, CompanyProductsUncheckedCreateWithoutCompanyInput>
  }

  export type CompanyProductsCreateManyCompanyInputEnvelope = {
    data: CompanyProductsCreateManyCompanyInput | CompanyProductsCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type CompanyRegionsCreateWithoutCompanyInput = {
    region: RegionCreateNestedOneWithoutCompaniesInput
  }

  export type CompanyRegionsUncheckedCreateWithoutCompanyInput = {
    region_id: number
  }

  export type CompanyRegionsCreateOrConnectWithoutCompanyInput = {
    where: CompanyRegionsWhereUniqueInput
    create: XOR<CompanyRegionsCreateWithoutCompanyInput, CompanyRegionsUncheckedCreateWithoutCompanyInput>
  }

  export type CompanyRegionsCreateManyCompanyInputEnvelope = {
    data: CompanyRegionsCreateManyCompanyInput | CompanyRegionsCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type CompanyTargetsCreateWithoutSourceInput = {
    status?: string | null
    notes?: string | null
    created_at?: Date | string
    target: CompanyCreateNestedOneWithoutTarget_ofInput
  }

  export type CompanyTargetsUncheckedCreateWithoutSourceInput = {
    target_company_id: number
    status?: string | null
    notes?: string | null
    created_at?: Date | string
  }

  export type CompanyTargetsCreateOrConnectWithoutSourceInput = {
    where: CompanyTargetsWhereUniqueInput
    create: XOR<CompanyTargetsCreateWithoutSourceInput, CompanyTargetsUncheckedCreateWithoutSourceInput>
  }

  export type CompanyTargetsCreateManySourceInputEnvelope = {
    data: CompanyTargetsCreateManySourceInput | CompanyTargetsCreateManySourceInput[]
    skipDuplicates?: boolean
  }

  export type CompanyTargetsCreateWithoutTargetInput = {
    status?: string | null
    notes?: string | null
    created_at?: Date | string
    source: CompanyCreateNestedOneWithoutTargetsInput
  }

  export type CompanyTargetsUncheckedCreateWithoutTargetInput = {
    source_company_id: number
    status?: string | null
    notes?: string | null
    created_at?: Date | string
  }

  export type CompanyTargetsCreateOrConnectWithoutTargetInput = {
    where: CompanyTargetsWhereUniqueInput
    create: XOR<CompanyTargetsCreateWithoutTargetInput, CompanyTargetsUncheckedCreateWithoutTargetInput>
  }

  export type CompanyTargetsCreateManyTargetInputEnvelope = {
    data: CompanyTargetsCreateManyTargetInput | CompanyTargetsCreateManyTargetInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutCompanyInput = {
    type: string
    message?: string | null
    created_at?: Date | string
    is_read?: boolean
    related_company?: CompanyCreateNestedOneWithoutTriggered_notificationsInput
  }

  export type NotificationUncheckedCreateWithoutCompanyInput = {
    notification_id?: number
    type: string
    message?: string | null
    related_company_id?: number | null
    created_at?: Date | string
    is_read?: boolean
  }

  export type NotificationCreateOrConnectWithoutCompanyInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutCompanyInput, NotificationUncheckedCreateWithoutCompanyInput>
  }

  export type NotificationCreateManyCompanyInputEnvelope = {
    data: NotificationCreateManyCompanyInput | NotificationCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutRelated_companyInput = {
    type: string
    message?: string | null
    created_at?: Date | string
    is_read?: boolean
    company: CompanyCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutRelated_companyInput = {
    notification_id?: number
    company_id: number
    type: string
    message?: string | null
    created_at?: Date | string
    is_read?: boolean
  }

  export type NotificationCreateOrConnectWithoutRelated_companyInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutRelated_companyInput, NotificationUncheckedCreateWithoutRelated_companyInput>
  }

  export type NotificationCreateManyRelated_companyInputEnvelope = {
    data: NotificationCreateManyRelated_companyInput | NotificationCreateManyRelated_companyInput[]
    skipDuplicates?: boolean
  }

  export type IndustryUpsertWithoutCompaniesInput = {
    update: XOR<IndustryUpdateWithoutCompaniesInput, IndustryUncheckedUpdateWithoutCompaniesInput>
    create: XOR<IndustryCreateWithoutCompaniesInput, IndustryUncheckedCreateWithoutCompaniesInput>
    where?: IndustryWhereInput
  }

  export type IndustryUpdateToOneWithWhereWithoutCompaniesInput = {
    where?: IndustryWhereInput
    data: XOR<IndustryUpdateWithoutCompaniesInput, IndustryUncheckedUpdateWithoutCompaniesInput>
  }

  export type IndustryUpdateWithoutCompaniesInput = {
    industry_name?: StringFieldUpdateOperationsInput | string
  }

  export type IndustryUncheckedUpdateWithoutCompaniesInput = {
    industry_id?: IntFieldUpdateOperationsInput | number
    industry_name?: StringFieldUpdateOperationsInput | string
  }

  export type LocationUpsertWithoutCompaniesInput = {
    update: XOR<LocationUpdateWithoutCompaniesInput, LocationUncheckedUpdateWithoutCompaniesInput>
    create: XOR<LocationCreateWithoutCompaniesInput, LocationUncheckedCreateWithoutCompaniesInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutCompaniesInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutCompaniesInput, LocationUncheckedUpdateWithoutCompaniesInput>
  }

  export type LocationUpdateWithoutCompaniesInput = {
    country?: StringFieldUpdateOperationsInput | string
  }

  export type LocationUncheckedUpdateWithoutCompaniesInput = {
    location_id?: IntFieldUpdateOperationsInput | number
    country?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyMatchesUpsertWithWhereUniqueWithoutCompany1Input = {
    where: CompanyMatchesWhereUniqueInput
    update: XOR<CompanyMatchesUpdateWithoutCompany1Input, CompanyMatchesUncheckedUpdateWithoutCompany1Input>
    create: XOR<CompanyMatchesCreateWithoutCompany1Input, CompanyMatchesUncheckedCreateWithoutCompany1Input>
  }

  export type CompanyMatchesUpdateWithWhereUniqueWithoutCompany1Input = {
    where: CompanyMatchesWhereUniqueInput
    data: XOR<CompanyMatchesUpdateWithoutCompany1Input, CompanyMatchesUncheckedUpdateWithoutCompany1Input>
  }

  export type CompanyMatchesUpdateManyWithWhereWithoutCompany1Input = {
    where: CompanyMatchesScalarWhereInput
    data: XOR<CompanyMatchesUpdateManyMutationInput, CompanyMatchesUncheckedUpdateManyWithoutCompany1Input>
  }

  export type CompanyMatchesScalarWhereInput = {
    AND?: CompanyMatchesScalarWhereInput | CompanyMatchesScalarWhereInput[]
    OR?: CompanyMatchesScalarWhereInput[]
    NOT?: CompanyMatchesScalarWhereInput | CompanyMatchesScalarWhereInput[]
    company1_id?: IntFilter<"CompanyMatches"> | number
    company2_id?: IntFilter<"CompanyMatches"> | number
    matched_at?: DateTimeFilter<"CompanyMatches"> | Date | string
    match_type?: StringNullableFilter<"CompanyMatches"> | string | null
  }

  export type CompanyMatchesUpsertWithWhereUniqueWithoutCompany2Input = {
    where: CompanyMatchesWhereUniqueInput
    update: XOR<CompanyMatchesUpdateWithoutCompany2Input, CompanyMatchesUncheckedUpdateWithoutCompany2Input>
    create: XOR<CompanyMatchesCreateWithoutCompany2Input, CompanyMatchesUncheckedCreateWithoutCompany2Input>
  }

  export type CompanyMatchesUpdateWithWhereUniqueWithoutCompany2Input = {
    where: CompanyMatchesWhereUniqueInput
    data: XOR<CompanyMatchesUpdateWithoutCompany2Input, CompanyMatchesUncheckedUpdateWithoutCompany2Input>
  }

  export type CompanyMatchesUpdateManyWithWhereWithoutCompany2Input = {
    where: CompanyMatchesScalarWhereInput
    data: XOR<CompanyMatchesUpdateManyMutationInput, CompanyMatchesUncheckedUpdateManyWithoutCompany2Input>
  }

  export type CompanyProductsUpsertWithWhereUniqueWithoutCompanyInput = {
    where: CompanyProductsWhereUniqueInput
    update: XOR<CompanyProductsUpdateWithoutCompanyInput, CompanyProductsUncheckedUpdateWithoutCompanyInput>
    create: XOR<CompanyProductsCreateWithoutCompanyInput, CompanyProductsUncheckedCreateWithoutCompanyInput>
  }

  export type CompanyProductsUpdateWithWhereUniqueWithoutCompanyInput = {
    where: CompanyProductsWhereUniqueInput
    data: XOR<CompanyProductsUpdateWithoutCompanyInput, CompanyProductsUncheckedUpdateWithoutCompanyInput>
  }

  export type CompanyProductsUpdateManyWithWhereWithoutCompanyInput = {
    where: CompanyProductsScalarWhereInput
    data: XOR<CompanyProductsUpdateManyMutationInput, CompanyProductsUncheckedUpdateManyWithoutCompanyInput>
  }

  export type CompanyProductsScalarWhereInput = {
    AND?: CompanyProductsScalarWhereInput | CompanyProductsScalarWhereInput[]
    OR?: CompanyProductsScalarWhereInput[]
    NOT?: CompanyProductsScalarWhereInput | CompanyProductsScalarWhereInput[]
    company_id?: IntFilter<"CompanyProducts"> | number
    product_id?: IntFilter<"CompanyProducts"> | number
  }

  export type CompanyRegionsUpsertWithWhereUniqueWithoutCompanyInput = {
    where: CompanyRegionsWhereUniqueInput
    update: XOR<CompanyRegionsUpdateWithoutCompanyInput, CompanyRegionsUncheckedUpdateWithoutCompanyInput>
    create: XOR<CompanyRegionsCreateWithoutCompanyInput, CompanyRegionsUncheckedCreateWithoutCompanyInput>
  }

  export type CompanyRegionsUpdateWithWhereUniqueWithoutCompanyInput = {
    where: CompanyRegionsWhereUniqueInput
    data: XOR<CompanyRegionsUpdateWithoutCompanyInput, CompanyRegionsUncheckedUpdateWithoutCompanyInput>
  }

  export type CompanyRegionsUpdateManyWithWhereWithoutCompanyInput = {
    where: CompanyRegionsScalarWhereInput
    data: XOR<CompanyRegionsUpdateManyMutationInput, CompanyRegionsUncheckedUpdateManyWithoutCompanyInput>
  }

  export type CompanyRegionsScalarWhereInput = {
    AND?: CompanyRegionsScalarWhereInput | CompanyRegionsScalarWhereInput[]
    OR?: CompanyRegionsScalarWhereInput[]
    NOT?: CompanyRegionsScalarWhereInput | CompanyRegionsScalarWhereInput[]
    company_id?: IntFilter<"CompanyRegions"> | number
    region_id?: IntFilter<"CompanyRegions"> | number
  }

  export type CompanyTargetsUpsertWithWhereUniqueWithoutSourceInput = {
    where: CompanyTargetsWhereUniqueInput
    update: XOR<CompanyTargetsUpdateWithoutSourceInput, CompanyTargetsUncheckedUpdateWithoutSourceInput>
    create: XOR<CompanyTargetsCreateWithoutSourceInput, CompanyTargetsUncheckedCreateWithoutSourceInput>
  }

  export type CompanyTargetsUpdateWithWhereUniqueWithoutSourceInput = {
    where: CompanyTargetsWhereUniqueInput
    data: XOR<CompanyTargetsUpdateWithoutSourceInput, CompanyTargetsUncheckedUpdateWithoutSourceInput>
  }

  export type CompanyTargetsUpdateManyWithWhereWithoutSourceInput = {
    where: CompanyTargetsScalarWhereInput
    data: XOR<CompanyTargetsUpdateManyMutationInput, CompanyTargetsUncheckedUpdateManyWithoutSourceInput>
  }

  export type CompanyTargetsScalarWhereInput = {
    AND?: CompanyTargetsScalarWhereInput | CompanyTargetsScalarWhereInput[]
    OR?: CompanyTargetsScalarWhereInput[]
    NOT?: CompanyTargetsScalarWhereInput | CompanyTargetsScalarWhereInput[]
    source_company_id?: IntFilter<"CompanyTargets"> | number
    target_company_id?: IntFilter<"CompanyTargets"> | number
    status?: StringNullableFilter<"CompanyTargets"> | string | null
    notes?: StringNullableFilter<"CompanyTargets"> | string | null
    created_at?: DateTimeFilter<"CompanyTargets"> | Date | string
  }

  export type CompanyTargetsUpsertWithWhereUniqueWithoutTargetInput = {
    where: CompanyTargetsWhereUniqueInput
    update: XOR<CompanyTargetsUpdateWithoutTargetInput, CompanyTargetsUncheckedUpdateWithoutTargetInput>
    create: XOR<CompanyTargetsCreateWithoutTargetInput, CompanyTargetsUncheckedCreateWithoutTargetInput>
  }

  export type CompanyTargetsUpdateWithWhereUniqueWithoutTargetInput = {
    where: CompanyTargetsWhereUniqueInput
    data: XOR<CompanyTargetsUpdateWithoutTargetInput, CompanyTargetsUncheckedUpdateWithoutTargetInput>
  }

  export type CompanyTargetsUpdateManyWithWhereWithoutTargetInput = {
    where: CompanyTargetsScalarWhereInput
    data: XOR<CompanyTargetsUpdateManyMutationInput, CompanyTargetsUncheckedUpdateManyWithoutTargetInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutCompanyInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutCompanyInput, NotificationUncheckedUpdateWithoutCompanyInput>
    create: XOR<NotificationCreateWithoutCompanyInput, NotificationUncheckedCreateWithoutCompanyInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutCompanyInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutCompanyInput, NotificationUncheckedUpdateWithoutCompanyInput>
  }

  export type NotificationUpdateManyWithWhereWithoutCompanyInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutCompanyInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    notification_id?: IntFilter<"Notification"> | number
    company_id?: IntFilter<"Notification"> | number
    type?: StringFilter<"Notification"> | string
    message?: StringNullableFilter<"Notification"> | string | null
    related_company_id?: IntNullableFilter<"Notification"> | number | null
    created_at?: DateTimeFilter<"Notification"> | Date | string
    is_read?: BoolFilter<"Notification"> | boolean
  }

  export type NotificationUpsertWithWhereUniqueWithoutRelated_companyInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutRelated_companyInput, NotificationUncheckedUpdateWithoutRelated_companyInput>
    create: XOR<NotificationCreateWithoutRelated_companyInput, NotificationUncheckedCreateWithoutRelated_companyInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutRelated_companyInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutRelated_companyInput, NotificationUncheckedUpdateWithoutRelated_companyInput>
  }

  export type NotificationUpdateManyWithWhereWithoutRelated_companyInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutRelated_companyInput>
  }

  export type CompanyCreateWithoutIndustryInput = {
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    location?: LocationCreateNestedOneWithoutCompaniesInput
    matches?: CompanyMatchesCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsCreateNestedManyWithoutTargetInput
    notifications?: NotificationCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyUncheckedCreateWithoutIndustryInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    location_id?: number | null
    matches?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsUncheckedCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsUncheckedCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsUncheckedCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsUncheckedCreateNestedManyWithoutTargetInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationUncheckedCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyCreateOrConnectWithoutIndustryInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutIndustryInput, CompanyUncheckedCreateWithoutIndustryInput>
  }

  export type CompanyCreateManyIndustryInputEnvelope = {
    data: CompanyCreateManyIndustryInput | CompanyCreateManyIndustryInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithWhereUniqueWithoutIndustryInput = {
    where: CompanyWhereUniqueInput
    update: XOR<CompanyUpdateWithoutIndustryInput, CompanyUncheckedUpdateWithoutIndustryInput>
    create: XOR<CompanyCreateWithoutIndustryInput, CompanyUncheckedCreateWithoutIndustryInput>
  }

  export type CompanyUpdateWithWhereUniqueWithoutIndustryInput = {
    where: CompanyWhereUniqueInput
    data: XOR<CompanyUpdateWithoutIndustryInput, CompanyUncheckedUpdateWithoutIndustryInput>
  }

  export type CompanyUpdateManyWithWhereWithoutIndustryInput = {
    where: CompanyScalarWhereInput
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyWithoutIndustryInput>
  }

  export type CompanyScalarWhereInput = {
    AND?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
    OR?: CompanyScalarWhereInput[]
    NOT?: CompanyScalarWhereInput | CompanyScalarWhereInput[]
    company_id?: IntFilter<"Company"> | number
    company_name?: StringFilter<"Company"> | string
    registration_number?: StringFilter<"Company"> | string
    business_type?: StringFilter<"Company"> | string
    number_of_employees?: IntNullableFilter<"Company"> | number | null
    year_established?: IntNullableFilter<"Company"> | number | null
    company_description?: StringNullableFilter<"Company"> | string | null
    created_at?: DateTimeFilter<"Company"> | Date | string
    industry_id?: IntNullableFilter<"Company"> | number | null
    location_id?: IntNullableFilter<"Company"> | number | null
  }

  export type CompanyCreateWithoutLocationInput = {
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry?: IndustryCreateNestedOneWithoutCompaniesInput
    matches?: CompanyMatchesCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsCreateNestedManyWithoutTargetInput
    notifications?: NotificationCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyUncheckedCreateWithoutLocationInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry_id?: number | null
    matches?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsUncheckedCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsUncheckedCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsUncheckedCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsUncheckedCreateNestedManyWithoutTargetInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationUncheckedCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyCreateOrConnectWithoutLocationInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutLocationInput, CompanyUncheckedCreateWithoutLocationInput>
  }

  export type CompanyCreateManyLocationInputEnvelope = {
    data: CompanyCreateManyLocationInput | CompanyCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithWhereUniqueWithoutLocationInput = {
    where: CompanyWhereUniqueInput
    update: XOR<CompanyUpdateWithoutLocationInput, CompanyUncheckedUpdateWithoutLocationInput>
    create: XOR<CompanyCreateWithoutLocationInput, CompanyUncheckedCreateWithoutLocationInput>
  }

  export type CompanyUpdateWithWhereUniqueWithoutLocationInput = {
    where: CompanyWhereUniqueInput
    data: XOR<CompanyUpdateWithoutLocationInput, CompanyUncheckedUpdateWithoutLocationInput>
  }

  export type CompanyUpdateManyWithWhereWithoutLocationInput = {
    where: CompanyScalarWhereInput
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyWithoutLocationInput>
  }

  export type CompanyProductsCreateWithoutProductInput = {
    company: CompanyCreateNestedOneWithoutProductsInput
  }

  export type CompanyProductsUncheckedCreateWithoutProductInput = {
    company_id: number
  }

  export type CompanyProductsCreateOrConnectWithoutProductInput = {
    where: CompanyProductsWhereUniqueInput
    create: XOR<CompanyProductsCreateWithoutProductInput, CompanyProductsUncheckedCreateWithoutProductInput>
  }

  export type CompanyProductsCreateManyProductInputEnvelope = {
    data: CompanyProductsCreateManyProductInput | CompanyProductsCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CompanyProductsUpsertWithWhereUniqueWithoutProductInput = {
    where: CompanyProductsWhereUniqueInput
    update: XOR<CompanyProductsUpdateWithoutProductInput, CompanyProductsUncheckedUpdateWithoutProductInput>
    create: XOR<CompanyProductsCreateWithoutProductInput, CompanyProductsUncheckedCreateWithoutProductInput>
  }

  export type CompanyProductsUpdateWithWhereUniqueWithoutProductInput = {
    where: CompanyProductsWhereUniqueInput
    data: XOR<CompanyProductsUpdateWithoutProductInput, CompanyProductsUncheckedUpdateWithoutProductInput>
  }

  export type CompanyProductsUpdateManyWithWhereWithoutProductInput = {
    where: CompanyProductsScalarWhereInput
    data: XOR<CompanyProductsUpdateManyMutationInput, CompanyProductsUncheckedUpdateManyWithoutProductInput>
  }

  export type CompanyCreateWithoutProductsInput = {
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry?: IndustryCreateNestedOneWithoutCompaniesInput
    location?: LocationCreateNestedOneWithoutCompaniesInput
    matches?: CompanyMatchesCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesCreateNestedManyWithoutCompany2Input
    regions?: CompanyRegionsCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsCreateNestedManyWithoutTargetInput
    notifications?: NotificationCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyUncheckedCreateWithoutProductsInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry_id?: number | null
    location_id?: number | null
    matches?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany2Input
    regions?: CompanyRegionsUncheckedCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsUncheckedCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsUncheckedCreateNestedManyWithoutTargetInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationUncheckedCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyCreateOrConnectWithoutProductsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutProductsInput, CompanyUncheckedCreateWithoutProductsInput>
  }

  export type ProductCreateWithoutCompaniesInput = {
    product_name: string
  }

  export type ProductUncheckedCreateWithoutCompaniesInput = {
    product_id?: number
    product_name: string
  }

  export type ProductCreateOrConnectWithoutCompaniesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCompaniesInput, ProductUncheckedCreateWithoutCompaniesInput>
  }

  export type CompanyUpsertWithoutProductsInput = {
    update: XOR<CompanyUpdateWithoutProductsInput, CompanyUncheckedUpdateWithoutProductsInput>
    create: XOR<CompanyCreateWithoutProductsInput, CompanyUncheckedCreateWithoutProductsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutProductsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutProductsInput, CompanyUncheckedUpdateWithoutProductsInput>
  }

  export type CompanyUpdateWithoutProductsInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry?: IndustryUpdateOneWithoutCompaniesNestedInput
    location?: LocationUpdateOneWithoutCompaniesNestedInput
    matches?: CompanyMatchesUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUpdateManyWithoutCompany2NestedInput
    regions?: CompanyRegionsUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutProductsInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    matches?: CompanyMatchesUncheckedUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUncheckedUpdateManyWithoutCompany2NestedInput
    regions?: CompanyRegionsUncheckedUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUncheckedUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUncheckedUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUncheckedUpdateManyWithoutRelated_companyNestedInput
  }

  export type ProductUpsertWithoutCompaniesInput = {
    update: XOR<ProductUpdateWithoutCompaniesInput, ProductUncheckedUpdateWithoutCompaniesInput>
    create: XOR<ProductCreateWithoutCompaniesInput, ProductUncheckedCreateWithoutCompaniesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutCompaniesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutCompaniesInput, ProductUncheckedUpdateWithoutCompaniesInput>
  }

  export type ProductUpdateWithoutCompaniesInput = {
    product_name?: StringFieldUpdateOperationsInput | string
  }

  export type ProductUncheckedUpdateWithoutCompaniesInput = {
    product_id?: IntFieldUpdateOperationsInput | number
    product_name?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyRegionsCreateWithoutRegionInput = {
    company: CompanyCreateNestedOneWithoutRegionsInput
  }

  export type CompanyRegionsUncheckedCreateWithoutRegionInput = {
    company_id: number
  }

  export type CompanyRegionsCreateOrConnectWithoutRegionInput = {
    where: CompanyRegionsWhereUniqueInput
    create: XOR<CompanyRegionsCreateWithoutRegionInput, CompanyRegionsUncheckedCreateWithoutRegionInput>
  }

  export type CompanyRegionsCreateManyRegionInputEnvelope = {
    data: CompanyRegionsCreateManyRegionInput | CompanyRegionsCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type CompanyRegionsUpsertWithWhereUniqueWithoutRegionInput = {
    where: CompanyRegionsWhereUniqueInput
    update: XOR<CompanyRegionsUpdateWithoutRegionInput, CompanyRegionsUncheckedUpdateWithoutRegionInput>
    create: XOR<CompanyRegionsCreateWithoutRegionInput, CompanyRegionsUncheckedCreateWithoutRegionInput>
  }

  export type CompanyRegionsUpdateWithWhereUniqueWithoutRegionInput = {
    where: CompanyRegionsWhereUniqueInput
    data: XOR<CompanyRegionsUpdateWithoutRegionInput, CompanyRegionsUncheckedUpdateWithoutRegionInput>
  }

  export type CompanyRegionsUpdateManyWithWhereWithoutRegionInput = {
    where: CompanyRegionsScalarWhereInput
    data: XOR<CompanyRegionsUpdateManyMutationInput, CompanyRegionsUncheckedUpdateManyWithoutRegionInput>
  }

  export type CompanyCreateWithoutRegionsInput = {
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry?: IndustryCreateNestedOneWithoutCompaniesInput
    location?: LocationCreateNestedOneWithoutCompaniesInput
    matches?: CompanyMatchesCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsCreateNestedManyWithoutTargetInput
    notifications?: NotificationCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyUncheckedCreateWithoutRegionsInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry_id?: number | null
    location_id?: number | null
    matches?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsUncheckedCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsUncheckedCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsUncheckedCreateNestedManyWithoutTargetInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationUncheckedCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyCreateOrConnectWithoutRegionsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutRegionsInput, CompanyUncheckedCreateWithoutRegionsInput>
  }

  export type RegionCreateWithoutCompaniesInput = {
    region_name: string
  }

  export type RegionUncheckedCreateWithoutCompaniesInput = {
    region_id?: number
    region_name: string
  }

  export type RegionCreateOrConnectWithoutCompaniesInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutCompaniesInput, RegionUncheckedCreateWithoutCompaniesInput>
  }

  export type CompanyUpsertWithoutRegionsInput = {
    update: XOR<CompanyUpdateWithoutRegionsInput, CompanyUncheckedUpdateWithoutRegionsInput>
    create: XOR<CompanyCreateWithoutRegionsInput, CompanyUncheckedCreateWithoutRegionsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutRegionsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutRegionsInput, CompanyUncheckedUpdateWithoutRegionsInput>
  }

  export type CompanyUpdateWithoutRegionsInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry?: IndustryUpdateOneWithoutCompaniesNestedInput
    location?: LocationUpdateOneWithoutCompaniesNestedInput
    matches?: CompanyMatchesUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutRegionsInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    matches?: CompanyMatchesUncheckedUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUncheckedUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUncheckedUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUncheckedUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUncheckedUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUncheckedUpdateManyWithoutRelated_companyNestedInput
  }

  export type RegionUpsertWithoutCompaniesInput = {
    update: XOR<RegionUpdateWithoutCompaniesInput, RegionUncheckedUpdateWithoutCompaniesInput>
    create: XOR<RegionCreateWithoutCompaniesInput, RegionUncheckedCreateWithoutCompaniesInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutCompaniesInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutCompaniesInput, RegionUncheckedUpdateWithoutCompaniesInput>
  }

  export type RegionUpdateWithoutCompaniesInput = {
    region_name?: StringFieldUpdateOperationsInput | string
  }

  export type RegionUncheckedUpdateWithoutCompaniesInput = {
    region_id?: IntFieldUpdateOperationsInput | number
    region_name?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyCreateWithoutTargetsInput = {
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry?: IndustryCreateNestedOneWithoutCompaniesInput
    location?: LocationCreateNestedOneWithoutCompaniesInput
    matches?: CompanyMatchesCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsCreateNestedManyWithoutCompanyInput
    target_of?: CompanyTargetsCreateNestedManyWithoutTargetInput
    notifications?: NotificationCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyUncheckedCreateWithoutTargetsInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry_id?: number | null
    location_id?: number | null
    matches?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsUncheckedCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsUncheckedCreateNestedManyWithoutCompanyInput
    target_of?: CompanyTargetsUncheckedCreateNestedManyWithoutTargetInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationUncheckedCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyCreateOrConnectWithoutTargetsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutTargetsInput, CompanyUncheckedCreateWithoutTargetsInput>
  }

  export type CompanyCreateWithoutTarget_ofInput = {
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry?: IndustryCreateNestedOneWithoutCompaniesInput
    location?: LocationCreateNestedOneWithoutCompaniesInput
    matches?: CompanyMatchesCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsCreateNestedManyWithoutSourceInput
    notifications?: NotificationCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyUncheckedCreateWithoutTarget_ofInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry_id?: number | null
    location_id?: number | null
    matches?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsUncheckedCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsUncheckedCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsUncheckedCreateNestedManyWithoutSourceInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationUncheckedCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyCreateOrConnectWithoutTarget_ofInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutTarget_ofInput, CompanyUncheckedCreateWithoutTarget_ofInput>
  }

  export type CompanyUpsertWithoutTargetsInput = {
    update: XOR<CompanyUpdateWithoutTargetsInput, CompanyUncheckedUpdateWithoutTargetsInput>
    create: XOR<CompanyCreateWithoutTargetsInput, CompanyUncheckedCreateWithoutTargetsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutTargetsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutTargetsInput, CompanyUncheckedUpdateWithoutTargetsInput>
  }

  export type CompanyUpdateWithoutTargetsInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry?: IndustryUpdateOneWithoutCompaniesNestedInput
    location?: LocationUpdateOneWithoutCompaniesNestedInput
    matches?: CompanyMatchesUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUpdateManyWithoutCompanyNestedInput
    target_of?: CompanyTargetsUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutTargetsInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    matches?: CompanyMatchesUncheckedUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUncheckedUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUncheckedUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUncheckedUpdateManyWithoutCompanyNestedInput
    target_of?: CompanyTargetsUncheckedUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUncheckedUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUpsertWithoutTarget_ofInput = {
    update: XOR<CompanyUpdateWithoutTarget_ofInput, CompanyUncheckedUpdateWithoutTarget_ofInput>
    create: XOR<CompanyCreateWithoutTarget_ofInput, CompanyUncheckedCreateWithoutTarget_ofInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutTarget_ofInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutTarget_ofInput, CompanyUncheckedUpdateWithoutTarget_ofInput>
  }

  export type CompanyUpdateWithoutTarget_ofInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry?: IndustryUpdateOneWithoutCompaniesNestedInput
    location?: LocationUpdateOneWithoutCompaniesNestedInput
    matches?: CompanyMatchesUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUpdateManyWithoutSourceNestedInput
    notifications?: NotificationUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutTarget_ofInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    matches?: CompanyMatchesUncheckedUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUncheckedUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUncheckedUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUncheckedUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUncheckedUpdateManyWithoutSourceNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUncheckedUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyCreateWithoutMatchesInput = {
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry?: IndustryCreateNestedOneWithoutCompaniesInput
    location?: LocationCreateNestedOneWithoutCompaniesInput
    matched_with?: CompanyMatchesCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsCreateNestedManyWithoutTargetInput
    notifications?: NotificationCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyUncheckedCreateWithoutMatchesInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry_id?: number | null
    location_id?: number | null
    matched_with?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsUncheckedCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsUncheckedCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsUncheckedCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsUncheckedCreateNestedManyWithoutTargetInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationUncheckedCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyCreateOrConnectWithoutMatchesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutMatchesInput, CompanyUncheckedCreateWithoutMatchesInput>
  }

  export type CompanyCreateWithoutMatched_withInput = {
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry?: IndustryCreateNestedOneWithoutCompaniesInput
    location?: LocationCreateNestedOneWithoutCompaniesInput
    matches?: CompanyMatchesCreateNestedManyWithoutCompany1Input
    products?: CompanyProductsCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsCreateNestedManyWithoutTargetInput
    notifications?: NotificationCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyUncheckedCreateWithoutMatched_withInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry_id?: number | null
    location_id?: number | null
    matches?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany1Input
    products?: CompanyProductsUncheckedCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsUncheckedCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsUncheckedCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsUncheckedCreateNestedManyWithoutTargetInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutCompanyInput
    triggered_notifications?: NotificationUncheckedCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyCreateOrConnectWithoutMatched_withInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutMatched_withInput, CompanyUncheckedCreateWithoutMatched_withInput>
  }

  export type CompanyUpsertWithoutMatchesInput = {
    update: XOR<CompanyUpdateWithoutMatchesInput, CompanyUncheckedUpdateWithoutMatchesInput>
    create: XOR<CompanyCreateWithoutMatchesInput, CompanyUncheckedCreateWithoutMatchesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutMatchesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutMatchesInput, CompanyUncheckedUpdateWithoutMatchesInput>
  }

  export type CompanyUpdateWithoutMatchesInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry?: IndustryUpdateOneWithoutCompaniesNestedInput
    location?: LocationUpdateOneWithoutCompaniesNestedInput
    matched_with?: CompanyMatchesUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutMatchesInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    matched_with?: CompanyMatchesUncheckedUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUncheckedUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUncheckedUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUncheckedUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUncheckedUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUncheckedUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUpsertWithoutMatched_withInput = {
    update: XOR<CompanyUpdateWithoutMatched_withInput, CompanyUncheckedUpdateWithoutMatched_withInput>
    create: XOR<CompanyCreateWithoutMatched_withInput, CompanyUncheckedCreateWithoutMatched_withInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutMatched_withInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutMatched_withInput, CompanyUncheckedUpdateWithoutMatched_withInput>
  }

  export type CompanyUpdateWithoutMatched_withInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry?: IndustryUpdateOneWithoutCompaniesNestedInput
    location?: LocationUpdateOneWithoutCompaniesNestedInput
    matches?: CompanyMatchesUpdateManyWithoutCompany1NestedInput
    products?: CompanyProductsUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutMatched_withInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    matches?: CompanyMatchesUncheckedUpdateManyWithoutCompany1NestedInput
    products?: CompanyProductsUncheckedUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUncheckedUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUncheckedUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUncheckedUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUncheckedUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyCreateWithoutNotificationsInput = {
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry?: IndustryCreateNestedOneWithoutCompaniesInput
    location?: LocationCreateNestedOneWithoutCompaniesInput
    matches?: CompanyMatchesCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsCreateNestedManyWithoutTargetInput
    triggered_notifications?: NotificationCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyUncheckedCreateWithoutNotificationsInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry_id?: number | null
    location_id?: number | null
    matches?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsUncheckedCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsUncheckedCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsUncheckedCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsUncheckedCreateNestedManyWithoutTargetInput
    triggered_notifications?: NotificationUncheckedCreateNestedManyWithoutRelated_companyInput
  }

  export type CompanyCreateOrConnectWithoutNotificationsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutNotificationsInput, CompanyUncheckedCreateWithoutNotificationsInput>
  }

  export type CompanyCreateWithoutTriggered_notificationsInput = {
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry?: IndustryCreateNestedOneWithoutCompaniesInput
    location?: LocationCreateNestedOneWithoutCompaniesInput
    matches?: CompanyMatchesCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsCreateNestedManyWithoutTargetInput
    notifications?: NotificationCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutTriggered_notificationsInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry_id?: number | null
    location_id?: number | null
    matches?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany1Input
    matched_with?: CompanyMatchesUncheckedCreateNestedManyWithoutCompany2Input
    products?: CompanyProductsUncheckedCreateNestedManyWithoutCompanyInput
    regions?: CompanyRegionsUncheckedCreateNestedManyWithoutCompanyInput
    targets?: CompanyTargetsUncheckedCreateNestedManyWithoutSourceInput
    target_of?: CompanyTargetsUncheckedCreateNestedManyWithoutTargetInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutTriggered_notificationsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutTriggered_notificationsInput, CompanyUncheckedCreateWithoutTriggered_notificationsInput>
  }

  export type CompanyUpsertWithoutNotificationsInput = {
    update: XOR<CompanyUpdateWithoutNotificationsInput, CompanyUncheckedUpdateWithoutNotificationsInput>
    create: XOR<CompanyCreateWithoutNotificationsInput, CompanyUncheckedCreateWithoutNotificationsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutNotificationsInput, CompanyUncheckedUpdateWithoutNotificationsInput>
  }

  export type CompanyUpdateWithoutNotificationsInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry?: IndustryUpdateOneWithoutCompaniesNestedInput
    location?: LocationUpdateOneWithoutCompaniesNestedInput
    matches?: CompanyMatchesUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUpdateManyWithoutTargetNestedInput
    triggered_notifications?: NotificationUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutNotificationsInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    matches?: CompanyMatchesUncheckedUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUncheckedUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUncheckedUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUncheckedUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUncheckedUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUncheckedUpdateManyWithoutTargetNestedInput
    triggered_notifications?: NotificationUncheckedUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUpsertWithoutTriggered_notificationsInput = {
    update: XOR<CompanyUpdateWithoutTriggered_notificationsInput, CompanyUncheckedUpdateWithoutTriggered_notificationsInput>
    create: XOR<CompanyCreateWithoutTriggered_notificationsInput, CompanyUncheckedCreateWithoutTriggered_notificationsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutTriggered_notificationsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutTriggered_notificationsInput, CompanyUncheckedUpdateWithoutTriggered_notificationsInput>
  }

  export type CompanyUpdateWithoutTriggered_notificationsInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry?: IndustryUpdateOneWithoutCompaniesNestedInput
    location?: LocationUpdateOneWithoutCompaniesNestedInput
    matches?: CompanyMatchesUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutTriggered_notificationsInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    matches?: CompanyMatchesUncheckedUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUncheckedUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUncheckedUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUncheckedUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUncheckedUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUncheckedUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyMatchesCreateManyCompany1Input = {
    company2_id: number
    matched_at?: Date | string
    match_type?: string | null
  }

  export type CompanyMatchesCreateManyCompany2Input = {
    company1_id: number
    matched_at?: Date | string
    match_type?: string | null
  }

  export type CompanyProductsCreateManyCompanyInput = {
    product_id: number
  }

  export type CompanyRegionsCreateManyCompanyInput = {
    region_id: number
  }

  export type CompanyTargetsCreateManySourceInput = {
    target_company_id: number
    status?: string | null
    notes?: string | null
    created_at?: Date | string
  }

  export type CompanyTargetsCreateManyTargetInput = {
    source_company_id: number
    status?: string | null
    notes?: string | null
    created_at?: Date | string
  }

  export type NotificationCreateManyCompanyInput = {
    notification_id?: number
    type: string
    message?: string | null
    related_company_id?: number | null
    created_at?: Date | string
    is_read?: boolean
  }

  export type NotificationCreateManyRelated_companyInput = {
    notification_id?: number
    company_id: number
    type: string
    message?: string | null
    created_at?: Date | string
    is_read?: boolean
  }

  export type CompanyMatchesUpdateWithoutCompany1Input = {
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_type?: NullableStringFieldUpdateOperationsInput | string | null
    company2?: CompanyUpdateOneRequiredWithoutMatched_withNestedInput
  }

  export type CompanyMatchesUncheckedUpdateWithoutCompany1Input = {
    company2_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_type?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyMatchesUncheckedUpdateManyWithoutCompany1Input = {
    company2_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_type?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyMatchesUpdateWithoutCompany2Input = {
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_type?: NullableStringFieldUpdateOperationsInput | string | null
    company1?: CompanyUpdateOneRequiredWithoutMatchesNestedInput
  }

  export type CompanyMatchesUncheckedUpdateWithoutCompany2Input = {
    company1_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_type?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyMatchesUncheckedUpdateManyWithoutCompany2Input = {
    company1_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_type?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyProductsUpdateWithoutCompanyInput = {
    product?: ProductUpdateOneRequiredWithoutCompaniesNestedInput
  }

  export type CompanyProductsUncheckedUpdateWithoutCompanyInput = {
    product_id?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyProductsUncheckedUpdateManyWithoutCompanyInput = {
    product_id?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyRegionsUpdateWithoutCompanyInput = {
    region?: RegionUpdateOneRequiredWithoutCompaniesNestedInput
  }

  export type CompanyRegionsUncheckedUpdateWithoutCompanyInput = {
    region_id?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyRegionsUncheckedUpdateManyWithoutCompanyInput = {
    region_id?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyTargetsUpdateWithoutSourceInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: CompanyUpdateOneRequiredWithoutTarget_ofNestedInput
  }

  export type CompanyTargetsUncheckedUpdateWithoutSourceInput = {
    target_company_id?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyTargetsUncheckedUpdateManyWithoutSourceInput = {
    target_company_id?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyTargetsUpdateWithoutTargetInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: CompanyUpdateOneRequiredWithoutTargetsNestedInput
  }

  export type CompanyTargetsUncheckedUpdateWithoutTargetInput = {
    source_company_id?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyTargetsUncheckedUpdateManyWithoutTargetInput = {
    source_company_id?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutCompanyInput = {
    type?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_read?: BoolFieldUpdateOperationsInput | boolean
    related_company?: CompanyUpdateOneWithoutTriggered_notificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutCompanyInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    related_company_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NotificationUncheckedUpdateManyWithoutCompanyInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    related_company_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NotificationUpdateWithoutRelated_companyInput = {
    type?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_read?: BoolFieldUpdateOperationsInput | boolean
    company?: CompanyUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutRelated_companyInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    company_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NotificationUncheckedUpdateManyWithoutRelated_companyInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    company_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CompanyCreateManyIndustryInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    location_id?: number | null
  }

  export type CompanyUpdateWithoutIndustryInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutCompaniesNestedInput
    matches?: CompanyMatchesUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutIndustryInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    matches?: CompanyMatchesUncheckedUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUncheckedUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUncheckedUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUncheckedUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUncheckedUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUncheckedUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUncheckedUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUncheckedUpdateManyWithoutIndustryInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CompanyCreateManyLocationInput = {
    company_id?: number
    company_name: string
    registration_number: string
    business_type: string
    number_of_employees?: number | null
    year_established?: number | null
    company_description?: string | null
    created_at?: Date | string
    industry_id?: number | null
  }

  export type CompanyUpdateWithoutLocationInput = {
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry?: IndustryUpdateOneWithoutCompaniesNestedInput
    matches?: CompanyMatchesUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutLocationInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry_id?: NullableIntFieldUpdateOperationsInput | number | null
    matches?: CompanyMatchesUncheckedUpdateManyWithoutCompany1NestedInput
    matched_with?: CompanyMatchesUncheckedUpdateManyWithoutCompany2NestedInput
    products?: CompanyProductsUncheckedUpdateManyWithoutCompanyNestedInput
    regions?: CompanyRegionsUncheckedUpdateManyWithoutCompanyNestedInput
    targets?: CompanyTargetsUncheckedUpdateManyWithoutSourceNestedInput
    target_of?: CompanyTargetsUncheckedUpdateManyWithoutTargetNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutCompanyNestedInput
    triggered_notifications?: NotificationUncheckedUpdateManyWithoutRelated_companyNestedInput
  }

  export type CompanyUncheckedUpdateManyWithoutLocationInput = {
    company_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    registration_number?: StringFieldUpdateOperationsInput | string
    business_type?: StringFieldUpdateOperationsInput | string
    number_of_employees?: NullableIntFieldUpdateOperationsInput | number | null
    year_established?: NullableIntFieldUpdateOperationsInput | number | null
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    industry_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CompanyProductsCreateManyProductInput = {
    company_id: number
  }

  export type CompanyProductsUpdateWithoutProductInput = {
    company?: CompanyUpdateOneRequiredWithoutProductsNestedInput
  }

  export type CompanyProductsUncheckedUpdateWithoutProductInput = {
    company_id?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyProductsUncheckedUpdateManyWithoutProductInput = {
    company_id?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyRegionsCreateManyRegionInput = {
    company_id: number
  }

  export type CompanyRegionsUpdateWithoutRegionInput = {
    company?: CompanyUpdateOneRequiredWithoutRegionsNestedInput
  }

  export type CompanyRegionsUncheckedUpdateWithoutRegionInput = {
    company_id?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyRegionsUncheckedUpdateManyWithoutRegionInput = {
    company_id?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}