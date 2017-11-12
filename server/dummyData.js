import Post from './models/post';

export default function () {
  Post.count().exec((err, count) => {
    if (count > 0) {
     return;
    }

    const post1 = new Post({ name: 'Acetaminophen', id: '161', cuid: 'cikqgkv4q01ck7453ualdn3hd', frequency: 12001 });
    const post2 = new Post({ name: 'Chlorpheniramine', id: '2400', cuid: '7453ualdn3hfcikqgkv4q01ck', frequency: 12002 });
    const post3 = new Post({ name: 'Dextromethorphan', id: '3289', cuid: 'cikqdn3hdgkv4q01ck7453ual', frequency: 12003 });
    const post4 = new Post({ name: 'Phenylephrine', id: '8163', cuid: '3hfcikqgkv4q01ck7453ualdn', frequency: 12004 });
    const post5 = new Post({ name: 'Doxylamine', id: '3642', cuid: 'n3hdcikqgkv4q01ck7453uald', frequency: 12000 });

    Post.create([post1, post2, post3, post4, post5 ], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
