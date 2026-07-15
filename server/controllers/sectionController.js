import * as resourceService from '../services/resourceService.js';
import { sendSuccess } from '../utils/responses.js';

export function listSections(req, res) {
  sendSuccess(res, resourceService.listSectionsWithMeta());
}
