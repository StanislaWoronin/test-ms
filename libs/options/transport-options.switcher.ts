import { Microservices, settings } from '../shared';
import {
  ClientProviderOptions,
  RmqOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';

export const getTransportOptions = (
  serverName: Microservices,
): ClientProviderOptions => {
  switch (settings.transportName) {
    case Transport.TCP:
      return {
        name: serverName,
        //transport: Transport.TCP,
        options: {
          host: settings.host.localHost,
          port: settings.port[serverName],
        } as TcpOptions,
      };
    // case Transport.RMQ:
    //   return {
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://localhost:5672'],
    //       queue: serverName,
    //       queueOptions: {
    //         durable: true,
    //       },
    //     },
    //   } as RmqOptions;
  }
};
