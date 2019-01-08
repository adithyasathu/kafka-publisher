import * as TypeMoq from 'typemoq';
import * as sinon from 'sinon';
import { Worker } from '../src/worker';
import { Publisher } from "../src/publisher";
import {IPublisher} from "../src/interfaces";

describe('Kakfa Producer Test', () => {

    let worker = null;
    beforeEach(() => { sinon.stub(process, 'exit'); });
    afterEach(() => { sinon.restore(); if(worker) { worker.stop()} });

    it('should publish 2 messages', async () => {
        // Arrange
        const publisher: TypeMoq.IMock<IPublisher> = TypeMoq.Mock.ofType<Publisher>();

        publisher.setup(p => p.start()).returns(() => {
            return new Promise((resolve, reject ) => {
                resolve("Publisher Ready");
            });
        });

        // Act
        worker = new Worker(publisher.object, 'topic-test');
        await worker.start(2);

        // Assert
        publisher.verify(p => p.send(TypeMoq.It.isAnyString(), TypeMoq.It.isAnyNumber(), 'topic-test'), TypeMoq.Times.exactly(2));
    });

    it('should publish 5 messages', async () => {
        // Arrange
        const publisher: TypeMoq.IMock<IPublisher> = TypeMoq.Mock.ofType<Publisher>();

        publisher.setup(p => p.start()).returns(() => {
            return new Promise((resolve, reject ) => {
                resolve("Publisher Ready");
            });
        });

        // Act
        worker = new Worker(publisher.object, 'topic-test');
        await worker.start(5);

        // Assert
        publisher.verify(p => p.send(TypeMoq.It.isAnyString(), TypeMoq.It.isAnyNumber(), 'topic-test'), TypeMoq.Times.exactly(5));
    });

    it('throws error and exits on connection failure to Kafka', async () => {
        // Arrange
        const publisher: TypeMoq.IMock<IPublisher> = TypeMoq.Mock.ofType<Publisher>();

        publisher.setup(p => p.start()).returns(() => {
            return new Promise((resolve, reject ) => {
                reject("Error !!")
            });
        });

        // Act
        worker = new Worker(publisher.object, 'topic-test');
        await worker.start(0);

        // Assert
        sinon.assert.calledWith(process.exit, 1);
    });
});
