import {StoryRepository} from 'server/models/story/story-repository';
import {BaseController} from 'server/controllers/base-controller';
import {ValidationError, ModelNotFoundError} from 'server/errors';
import {IStoryApi} from 'shared/api';
import * as validator from "validator";

export class StoryController extends BaseController implements IStoryApi {
  
  constructor(private storyRepository: StoryRepository) {
    super();
  }

  fetch(req, res, next, id) {
    this.storyRepository.findById(id)
      .onFulfill((story) => {
        if (!story) {
          next(new ModelNotFoundError(id));
        } else {
          req.story = story;
          next();
        }
      }).onReject(next);
  }

  all(req, res, next) {
    this.storyRepository.all()
      .onFulfill((stories) => {
        res.json({result: stories, statusCode: 200});
      }).onReject(next);
  }

  findById(req, res, next) {
    return res.json({result: req.story, statusCode: 200});
  }

  create(req, res, next) {
    this.storyRepository.create(req.body)
      .onFulfill((story) => {
        res.json({result: story, statusCode: 200});
      }).onReject(next);
  }

  replace(req, res, next) {
    this.storyRepository.replace(req.story, req.body)
      .onFulfill((story) => {
        res.json({result: story, statusCode: 200});
      }).onReject(next);
  }

  update(req, res, next) {
    this.storyRepository.update(req.story, req.body)
      .onFulfill((story) => {
        res.json({result: story, statusCode: 200});
      }).onReject(next);
  }

  remove(req, res, next) {
    this.storyRepository.remove(req.story)
      .onFulfill(() => {
        res.json({statusCode: 200});
      }).onReject(next);
  }
}
