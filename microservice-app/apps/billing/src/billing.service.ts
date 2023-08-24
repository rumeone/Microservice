import {Injectable, Logger} from '@nestjs/common';

@Injectable()
export class BillingService {
    private readonly logger = new Logger();

    bill(data: any) {
      console.log("test");
      this.logger.log('Billing...', data);
    }

}
