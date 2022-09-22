/**
    * @INFO Updates the given user with a new doc
*/

module.exports = async (client, currentUserDoc) => {
    await client.db.collection("users").replaceOne(
        { id: currentUserDoc.id },
        currentUserDoc
    );
    console.log("Doc saved !");
}
