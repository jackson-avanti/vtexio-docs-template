import { Item } from 'vtex.product-context/react/ProductTypes'


export const cartSimulation = async (selectedItem: Item, setPrice: React.Dispatch<React.SetStateAction<number | undefined>>, paymentSystemId: string) => {
    if (selectedItem) {
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: [
                    {
                        id: selectedItem.itemId,
                        quantity: 1,
                        seller: '1',
                    }
                ],
                paymentData: {
                    payments: [
                        {
                            "paymentSystem": paymentSystemId,
                            "installments": 1
                        }
                    ]
                },
            })
        }

        await (fetch('/api/checkout/pub/orderForms/simulation?RnbBehavior=0', options)).then(res => res.json()).then((data) => {
            const unitMultiplier = data.items[0].unitMultiplier ?? 1
            setPrice(data.paymentData.payments[0].value / unitMultiplier)
        })
    }
}