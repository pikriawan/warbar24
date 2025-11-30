<x-customer-layout>
    <ul id="orders"></ul>
    <script>
        async function main() {
            const response = await fetch("/api/orders");
            const data = await response.json();

            const ordersElement = document.getElementById("orders");

            for (const order of data?.data?.orders) {
                const orderElement = document.createElement("li");
                orderElement.textContent = order.status;
                ordersElement.append(orderElement);
            }
        }

        main();
    </script>
</x-customer-layout>
