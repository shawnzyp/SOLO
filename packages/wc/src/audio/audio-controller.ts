export type AudioId = 'click'|'confirm'|'error'|'achievement'|'page'|'quest';
const files: Record<AudioId,string> = {
  click: new URL('./audio/click.wav', import.meta.url).toString(),
  confirm: new URL('./audio/confirm.wav', import.meta.url).toString(),
  error: new URL('./audio/error.wav', import.meta.url).toString(),
  achievement: new URL('./audio/achievement.wav', import.meta.url).toString(),
  page: new URL('./audio/page.wav', import.meta.url).toString(),
  quest: new URL('./audio/quest.wav', import.meta.url).toString(),
};
class AudioController {
  private cache = new Map<AudioId, HTMLAudioElement>();
  private _volume = 0.6;
  private _muted = false;
  setVolume(v:number){ this._volume = Math.min(1, Math.max(0, v)); this.cache.forEach(a=>a.volume=this._volume); }
  mute(m:boolean){ this._muted = m; this.cache.forEach(a=>a.muted=this._muted); }
  play(id:AudioId){ const el = this.get(id); el.currentTime = 0; el.play().catch(()=>{}); }
  get(id:AudioId){ let el = this.cache.get(id); if(!el){ el = new Audio(files[id]); el.volume = this._volume; el.muted = this._muted; this.cache.set(id, el); } return el; }
}
export const audio = new AudioController();