/**
    * @INFO Updates the given user with a new doc
*/

module.exports = async (client, currentMemberDoc) => {
    await client.db.collection("users").replaceOne(
        { id: currentMemberDoc.id },
        currentMemberDoc
    );
    console.log("Doc saved !");
}
