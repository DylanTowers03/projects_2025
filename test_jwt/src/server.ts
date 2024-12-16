import {App} from './config/index'
import { config } from './config/env';
async function main() {
    const app= new App(config.port);
    await app.listen()
}


console.log(config.port)
main();