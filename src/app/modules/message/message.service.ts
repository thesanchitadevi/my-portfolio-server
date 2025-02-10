import QueryBuilder from '../../builder/QueryBuilder';
import { IMessage } from './message.interface';
import { MessageModel } from './message.model';

const createMessageDB = async (message: IMessage) => {
  return await MessageModel.create(message);
};

const getMessagesDB = async (query: Record<string, unknown>) => {
  const messageQuery = new QueryBuilder(MessageModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await messageQuery.countTotal();
  const result = await messageQuery.modelQuery;

  return {
    meta,
    result,
  };
};

export const MessageServices = {
  createMessageDB,
  getMessagesDB,
};
