/**
    * @INFO Updates the given guild with a new doc
*/

module.exports = async (client, currentGuildDoc) => {
    await client.db.collection("guilds").replaceOne(
        {
            id: currentGuildDoc.id
        },
        currentGuildDoc
    );
    console.log("Doc saved !");
}
