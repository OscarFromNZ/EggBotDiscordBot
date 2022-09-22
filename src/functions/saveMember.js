/**
    * @INFO Updates the given member in guild with a new doc
*/

module.exports = async (client, currentMemberDoc) => {
    await client.db.collection("members").replaceOne(
        {
            $and: [
                { guild: currentMemberDoc.guild },
                { member: currentMemberDoc.member }
            ]
        },
        currentMemberDoc
    );
    console.log("Doc saved !");
}