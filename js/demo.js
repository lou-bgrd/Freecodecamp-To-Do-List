let demo = [
    {
        "text": "RDV",
        "date": "25/02/2023",
        "description": "Dîner au nautique",
        "status": "En-cours"
    },
    {
        "text": "Commission",
        "date": "24/02/2023",
        "description": "Aller au fleuriste acheter des fleurs pour rdv",
        "status": "En-cours"
    }
]

export function createDemo(array) {
    array.push(...demo);
    localStorage.setItem("data", JSON.stringify(array));

}