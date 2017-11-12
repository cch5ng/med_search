import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-frequency').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

// TODO test

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function updatePost(req, res) {
  console.log('req.params.id: ' + req.params.id)
  Post.updateOne(
    { 'rxcui': req.params.id },
    {$set: 
        {"rxcui" : req.params.id,
        "name": req.body.name,
        "synonym": req.body.synonym
         },
      $inc: { 'frequency': 1 }
    },
    { upsert: true }).exec((err, post) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ post });
  });
}

//sort('-dateAdded')

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
// export function addPost(req, res) {
//   if (!req.body.post.name || !req.body.post.id) {
//     res.status(403).end();
//   }

//   const newPost = new Post(req.body.post);

//   // Let's sanitize inputs
//   //newPost.title = sanitizeHtml(newPost.title);
//   newPost.name = sanitizeHtml(newPost.name);
//   newPost.id = sanitizeHtml(newPost.id);

//   //newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
//   newPost.cuid = cuid();
//   newPost.save((err, saved) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//     res.json({ post: saved });
//   });
// }
