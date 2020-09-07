import superagent from 'superagent';
import * as faker from 'faker';
import { Request, Response } from 'express';
import { API_URI } from '../../config';
import { serialize } from '../../utils';

export default async (req: Request, res: Response) => {
    try {
        const {query} = req;
        const response = await superagent.get(`${API_URI}/api/v1/movies?${serialize(query)}`);
        const manipulatedResponse = response.body.map(item => ({
            ...item,
            releaseDate: faker.random.number({min: 2010, max: 2020}),
            genres: faker.random.word(),
            description: faker.lorem.words(25)
        }))
        res.json(manipulatedResponse);
    } catch (error) {
        throw Error(error);   
    }
}
  