export const ship = new Image();
ship.src = "/../assets/Ship_1.png";
export let shipReady = false;
ship.onload = (e) => (shipReady = true);
