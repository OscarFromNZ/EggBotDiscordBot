/**
    * @INFO Check the eggboard for a leaderboard of eggs !
*/

module.exports = {
    async execute(client, interaction) {
        var s = " ";
        let arr = [];
        
        await client.db.collection("users").find().forEach(doc => {
            arr.push(doc);
        });
        arr.sort((a, b) => b.eggs - a.eggs);

        //var step = 0;
        for (let i = 0; i < 11; i++) {
            if (i < 10)  {
                console.log(`looping through users, ${i}`);
                let userObj = await client.users.fetch(arr[i].id);
                s = s + "`" + i + "` **" + userObj.username + "** with " + arr[i].eggs + " eggs\n";
            } else {
                console.log('responding');
                await interaction.respond(interaction, s.toString());
            }
        }
    }
}