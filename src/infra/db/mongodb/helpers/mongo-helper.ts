import { Collection, MongoClient, ObjectId, Document } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  async findOne<T> (
    collection: Collection<Document>,
    { _id }: { _id: ObjectId | string }
  ) {
    return collection.findOne({ _id }) as unknown as
      | (Omit<T, 'id'> & { _id: string })
      | undefined
  }
}
