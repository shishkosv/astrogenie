import devConfig from "./dev"
import prodConfig from "./prod"

const ENV = process.env.NODE_ENV || "development"

const config = ENV === "production" ? prodConfig : devConfig

export default config

