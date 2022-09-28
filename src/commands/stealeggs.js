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
        let victimid = await interaction.options._hoistedOptions[0].user.id;
        let stealerid = await interaction.user.id;
        let risklvl = await interaction.options._hoistedOptions[1].value;
        let x = Math.floor(Math.random() * 100 * risklvl) + 1; // Amount gained/lost
        let y = Math.floor(Math.random() * 2 * risklvl); // Whether or not you gain or lose the rob
        
        if (y < 3) {
            await interaction.editReply(`You won, would've gained ${x} eggs`);
        } else {
            await interaction.editReply(`You lost, would've lost ${x} eggs`);
        }
    }
}