/**
    * @INFO Adds or removes eggs from a given user
*/

module.exports = async (client, eggs, user) => {
    let userDoc = await client.functions.getOrCreateUser(client, user.id);
    console.log(userDoc);
    userDoc.eggs = userDoc.eggs + eggs;

    await client.functions.saveUser(client, userDoc);
}
