import superagent from 'superagent';
import { Request, Response } from 'express';
import { API_URI } from '../../../config';
import * as faker from 'faker';

export default async (req: Request, res: Response) => {
    try {
        const {query: {id}} = req;
        const response = await superagent.get(`${API_URI}/api/v1/movies/${id}`);
        const manipulatedResponse = {
            ...response.body,
            releaseDate: faker.random.number({min: 2010, max: 2020}),
            description: faker.lorem.words(150),
            producer: `${faker.name.firstName()} ${faker.name.lastName()}`,
            director: `${faker.name.firstName()} ${faker.name.lastName()}`
        }
        res.json(manipulatedResponse);
    } catch (error) {
        throw Error(error);
    }
}
  