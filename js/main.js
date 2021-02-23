import {comments, names} from './data.js';
import {createDescriptions, checkLengthComment} from './util.js';
import {showUsersPictures} from './picture.js';

const pictures = createDescriptions(comments, names);
showUsersPictures(pictures);
checkLengthComment('sjefhksjfh', 90);
