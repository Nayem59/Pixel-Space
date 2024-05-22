export const ship = new Image();
ship.src = "/../assets/Ship_1.png";
export let shipReady = false;
ship.onload = (e) => (shipReady = true);

export const turret = new Image();
turret.src = "/../assets/turret.png";
export let turretReady = false;
turret.onload = (e) => (turretReady = true);
