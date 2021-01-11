const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

  exports.updateUserFeedAfterFollow = functions.firestore.document('/following/{currentUid}/user-following/{uid}').onCreate((snap, context) => {
    const currentUid = context.params.currentUid;
    const uid = context.params.uid;
    const db = admin.firestore();
    functions.logger.log('Function called..')

    return db.collection('posts').where('ownerUid', '==', uid).get().then((snapshot) => {
        functions.logger.log('Fetched posts..')
        snapshot.forEach((doc) => { 
            const postId = doc.id;
            functions.logger.log('PostID:', postId)
            const writeResult = db.collection('users').doc(currentUid).collection('user-feed').doc(postId);
            writeResult.set({});
        });
        return null;
      })
      .catch((err) => {
        functions.logger.log(err);
      });
  });

  exports.updateUserFeedAfterUnfollow = functions.firestore.document('/following/{currentUid}/user-following/{uid}').onDelete((snap, context) => {
    const currentUid = context.params.currentUid;
    const uid = context.params.uid;
    const db = admin.firestore();

    return db.collection('posts').where('ownerUid', '==', uid).get().then((snapshot) => {
        snapshot.forEach((doc) => { 
            const postId = doc.id;
            db.collection('users').doc(currentUid).collection('user-feed').doc(postId).delete();
        });
        return null;
      })
      .catch((err) => {
        functions.logger.log(err);
      });
  });

  exports.updateUserFeedAfterPost = functions.firestore.document('/posts/{postId}').onCreate((snap, context) => {
    const postId = context.params.postId;
    const data = snap.data();
    const ownerUid = data.uid
    const db = admin.firestore();

    return db.collection('followers').doc(ownerUid).collection('user-followers').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            db.collection('users').doc(doc.id).collection('user-feed').doc(postId).set({});
        });

        db.collection('users').doc(ownerUid).collection('user-feed').doc(postId).set({});

        return null;
    });
  });