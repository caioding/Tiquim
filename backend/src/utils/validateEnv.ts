import { cleanEnv, host, port, str } from "envalid";

function validate_env() {
  cleanEnv(process.env, {
    PORT: port(),
    HOST: host(),
    NODE_ENV: str(),
    DATABASE_URL: str(),
    DEFAULT_LANG: str({ choices: ["pt-BR", "en-US"] }),
  });
}

export default validate_env;
