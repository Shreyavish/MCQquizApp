declare module "mongoose" {
  namespace Types {
    class Html extends String {}
  }

  namespace Schema {
    namespace Types {
      class Html extends String {}
    }
  }
}
