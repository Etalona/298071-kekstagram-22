import {comments, names} from './data.js';
import {createDescriptions, checkLengthComment} from './util.js';

createDescriptions(comments, names);
checkLengthComment('sjefhksjfh', 90);
