import * as Logger from "simple-node-logger";
import {IPublisher, IWorker} from "./interfaces";
export const log = Logger.createSimpleLogger();
import { fakeCustomer, fakeProduct, fakeTransactionTime } from "./helper";

export class Worker implements IWorker {

  private publisher: IPublisher;
  private readonly topic: string;

  constructor(publisher: IPublisher, topic:string) {
      this.publisher = publisher;
      this.topic = topic;
  }


  public async start(num) {
    log.info("Starting worker ..");
    await this.publisher.start().
        catch((err) => {
            log.error("Connecting Failure to Kafka ", err);
            process.exit(1);
        }); // wait for connection

    // simulate few product sales
      const loop = [...Array(num).keys()];
      for(let looper in loop) {
          const transaction = fakeTransactionTime(Number(looper));
          const msg = { custom : fakeCustomer(), product : fakeProduct() , transaction};
          await this.publisher.send(JSON.stringify(msg), transaction, this.topic)
      }

      log.info(`Published ${num} messages onto Kafka ..`);

  }

  public async stop() {
      await this.publisher.stop(); // wait for graceful stop
  }

}
