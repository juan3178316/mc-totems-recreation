import { system, world } from "@minecraft/server";


function loadTotem(name,hand) {
	system.run(() => {
		new PlayerTotemEffect(name,hand);
	});
}

function getTypeHand(player,hand) {
	return player.getComponent("minecraft:equippable").getEquipmentSlot(hand);
}

function potionEffect(p,obj,c=0) {
	do {
		p.addEffect("minecraft:"+obj[c].n, obj[c].t * 20, {amplifier: obj[c].amp, showParticles: obj[c].sp});
		c++;
	} while (c<obj.length);
}

world.beforeEvents.entityHurt.subscribe(({ cancel, damage, hurtEntity }) => {
		if(damage >= hurtEntity.getComponent("minecraft:health").currentValue) {
		// Query if the damage that receive the player is greater than or equal to her current health
		if(getTypeHand(hurtEntity,"Offhand").hasItem() && getTypeHand(hurtEntity,"Offhand").hasTag("ct:custom_totem")) {
			cancel = true;
			loadTotem(String(hurtEntity.name),"Offhand");
		}
		else if(getTypeHand(hurtEntity,"Mainhand").hasItem() && getTypeHand(hurtEntity,"Mainhand").hasTag("ct:custom_totem")) {
			cancel = true;
			loadTotem(String(hurtEntity.name),"Mainhand");
		}
		else return;
	}
}, { entityFilter: { type: "minecraft:player" } });

class PlayerTotemEffect {
	constructor(namePlayer,hand) {
		this.player = world.getPlayers({name:namePlayer})[0];
		this.itemHand = getTypeHand(this.player,hand);
		this.itemHand.setItem(); // remove no stackeable totems

		// The commented code its used for item with stacks greater than 1
		//try { this.itemHand.amount -= 1; }
		//catch(error) {
			//this.itemHand.setItem();
			//console.error(error); // unnecessary
		//};
		// Apply totem behavior
		this.player.getComponent("minecraft:health").resetToDefaultValue();
  this.player.runCommand("effect @s clear");
		this.player.applyDamage(1);
		potionEffect(this.player, [
			{ n:"absorption",t:5,amp:1,sp:true },
			{ n:"regeneration",t:45,amp:1,sp:true },
			{ n:"fire_resistance",t:40,amp:0,sp:true }
		]);
		this.player.runCommand("particle minecraft:totem_particle ~ ~2 ~");
		this.player.runCommand("particle minecraft:totem_particle ~ ~2 ~");
		this.player.runCommand("playsound random.totem");
	}
}
