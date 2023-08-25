import {Injectable} from "@nestjs/common";
import {Ctx, RmqContext, RmqOptions, Transport} from "@nestjs/microservices"
import {ConfigService} from "@nestjs/config";

@Injectable()
export class RmqService {
    constructor(private readonly configService: ConfigService) {
    }
    getOptions(queue: string, noAck = false): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBIT_MQ_URI')],
                queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
                noAck,
                persistent: true
            }
        }
    }

    ack(@Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        channel.ack(originalMsg);
    }
}