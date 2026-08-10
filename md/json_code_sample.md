# JSON code sample

> [!warning]
> This code it's updated in 08/10/26 - 12:16 (UTC -5)

### BP/items/custom_item.json
<details>

```json
{
	"format_version": "1.26.0"
	"minecraft:item": {
		"description": {
			"identifier": "ct:custom_totem",
			"menu_category": {
				"category": "items"
			}
		},
		"components": {
			/*** Components ***/
			"minecraft:allow_off_hand": true,
			"minecraft:cooldown": {
				"category": "ct_on_use",
				"duration": 0
			},
			"minecraft:display_name": {
				"value": "custom totem"
			},
			"minecraft:hand_equipped": false,
			"minecraft:icon": {
				"textures": {
				"default": "totem"
				}
			},
			"minecraft:max_stack_size": 1,
			"minecraft:stacked_by_data": true,
			"minecraft:tags": {
				"tags": [ "ct:custom_totem" ]
			}
		}
	}
}
```
</details>

### BP/manifest.json
<details>

```json
{
	"format_version": 2,
	"header": {
		"name": "my custom totems",
		"description": "add custom totems in Minecraft",
		"uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
		"version": [ 1, 0, 0 ],
		"min_engine_version": [ 1, 26, 30 ]
	},
	"modules": [
    // ...
		{
			"type": "script",
			"language": "javascript",
			"uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
			"entry": "scripts/main.js",
			"version": [ 0, 1, 0 ]
		}
	],
	"dependencies": [
    // The API beta isn't required now
		{
			"module_name": "@minecraft/server",
			"version": "2.8.0"
		}
	],
	"metadata": {
		"authors": [ "https://github.com/juan3178316" ],
		"url": "https://curseforge.com/minecraft-bedrock/addons/the-void-totem",
		"license": "MIT",
		"product_type": "addon",
		"generated_with": {
			"itemblend": [ "0.0.1-index" ]
		}
	}
}

```
</details>
