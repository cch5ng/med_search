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
//sort('-dateAdded')

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.id) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  //newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.id = sanitizeHtml(newPost.id);

  //newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
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
  Post.updateOne({ 'id': req.params.id }, {$set: {"cuid" : cuid(), "id" : req.params.id }, $inc: { 'frequency': 1 }}, { upsert: true }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });

    // post.update(
    //   { 'id': req.params.id },
    //   { $inc: { "frequency": 1 } },
    //   { upsert: true }
    // ).exec((err, post) => {
    //   if (err) {
    //     res.status(500).send(err);
    //   }
    //   
    // });
  });
}



// { $set: {"_id" : 4, "violations" : 7, "borough" : "Manhattan" } },
//       { upsert: true }



//   Post.findAndModify({
//     query: { id: req.params.id },
//     update: { $inc: { "frequency": 1 } },
//     upsert: true
//   }).exec((err, post) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//     res.json({ post });
//   });
// }

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
// export function deletePost(req, res) {
//   Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
//     if (err) {
//       res.status(500).send(err);
//     }

//     post.remove(() => {
//       res.status(200).end();
//     });
//   });
// }
/* ,
    { $set: { cuid: cuid(), id: req.params.id },  },
    {upsert:true, returnNewDocument : true }*/

