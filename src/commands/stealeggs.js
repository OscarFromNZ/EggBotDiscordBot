/**
    * @INFO This command lets a user steal eggs from a user
*/

module.exports = {
    data: {
        name: "stealeggs",
        description: "Steals eggs from a user",
        permission: 0, // Member
        isDangerous: false,
        options: [
            {
                name: "user",
                description: "The user to remove the messages from",
                type: 6,
                required: true
            },
            {
                name: "risk",
                description: "The risk level",
                type: 10,
                required: true,
                choices: [
                    {
                        name: "High",
                        value: 3
                    },
                    {
                        name: "Medium",
                        value: 2
                    },
                    {
                        name: "Low",
                        value: 1
                    }
                ]
            }
        ]
    },

    async execute(client, interaction) {
        return interaction.reply({ content: "Content under development", ephemeral: true });

        let victimid = await interaction.options._hoistedOptions[0].user.id;
        let stealerid = await interaction.user.id;
        let risklvl = await interaction.options._hoistedOptions[1].value;
        let percentsuccess = Math.floor(Math.random() * 33 * risklvl) + 1; // Amount gained/lost
        var random = Math.floor(Math.random() * 101);
        
        if (random <= percentsuccess) {
            await interaction.editReply(`You won, would've gained ${percentsuccess / 2} eggs | *this command is still under development and doesn't actually do anything yet*`);
        } else {
            await interaction.editReply(`You lost, would've lost ${percentsuccess / 2} eggs | *this command is still under development and doesn't actually do anything yet*`);
        }
    }
}