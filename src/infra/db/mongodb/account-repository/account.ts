import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await MongoHelper.findOne<AccountModel>(accountCollection, {
      _id: result.insertedId
    })

    if (!account) {
      throw Error('account could not be added to the database')
    }

    const { _id, ...accountWithoutId } = account

    return {
      ...accountWithoutId,
      id: _id
    }
  }
}
