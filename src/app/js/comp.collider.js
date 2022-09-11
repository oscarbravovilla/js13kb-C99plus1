import { GameState } from "./enums";

AFRAME.registerComponent('cheap-collider', {
	schema:
	{
		id: { type: 'string', default: null }
	},
	init: function () {
		this.isHit = true;
		this.key = null;
		this.game = null;
		this.ready = false;
		this.el.sceneEl.addEventListener("loaded", () => {
			this.game = document.querySelector('a-scene').systems["game"];
			this.ready = true;
		});
		this.el.addEventListener('raycaster-intersection', evt => {
			this.key = parseInt(evt.detail.els[0].id.split("_")[1]);
			this.isHit = true;
			this.evaluate(evt);
		});
		this.el.addEventListener('raycaster-intersection-cleared', evt => {
			if (this.ready && this.game.state.v === GameState.PLAY) {
				this.isHit = false;
				var t = setTimeout(() => {
					if (!this.isHit) {
						this.game.state.set(GameState.FALLING);
					}
					clearTimeout(t);
				}, 200);
			}
		});
	},
	evaluate: function () {
		if (this.ready && this.game.state.v === GameState.PLAY) {
			if (this.key === 777 && this.game.level !== 7) {
				this.game.state.set(GameState.NEXTLEVEL);
			} else if (this.key === 777 && this.game.level === 7) {
				this.game.state.set(GameState.END);
			}
		}
	},
});
