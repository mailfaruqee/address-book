const contacts = [
    {
        id: 1,
        fullName: "Sayyid Al Murtadho",
        age: 22,
        phone: "+6281234567890",
        office: "Vriens and Partners"
    },
    {
        id: 2,
        fullName: "Wahyu Agung Primantaka",
        age: 23,
        phone: "+6280987654321",
        office: "Antam"
    },
    {
        id: 3,
        fullName: "Ammar",
        age: 20,
        phone: "+623216549870",
        office: "UGM"
    },
];

for (let index = 0; index < contacts.length; index++) {
    // const contact = contacts[index];
    const {id, fullName, phone, age} = contacts[index];
    // let ageCategory = "";
    const ageCategory = age > 21 ? "has graduated" : "is still in college";

    // if (contact.age > 21) {
    //     ageCategory = "has graduated";
    // } else {
    //     ageCategory = "still struggle with undergrad final thesis"
    // }
    // console.log(`${contact.id}. ${contact.fullName} (${contact.phone}) ${ageCategory}`);
    console.log(`${id}. ${fullName} (${phone}) ${ageCategory}`);

}
