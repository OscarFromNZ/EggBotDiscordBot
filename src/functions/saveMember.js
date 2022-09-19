module.exports = async (client, currentMemberDoc) => {
    await client.db.collection("memberInGuild").replaceOne(
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
