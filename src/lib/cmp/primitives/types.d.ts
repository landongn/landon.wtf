export interface Tag {
	[key: string]: string;
}
export interface Layer {
	[key: string]: string;
}

export interface Component {
	[key: string]: string;
}

export interface Behavior {
	getComponent?(): Component | void;
	// Awake is called when an enabled script instance is being loaded.
	Awake?(scene: ThrelteContext, delta: number): void;
	// Awake call when attaching to a svelte/threlte component
	Awake?(e: { ref: Group<Object3DEventMap>; cleanup: (callback: ?(() => void)) => void }): void;
	// Frame-rate independent MonoBehaviour.FixedUpdate message for physics calculations.
	FixedUpdate?(scene: ThrelteContext, delta: number): void;

	// LateUpdate is called every frame, if the Behaviour is enabled.
	LateUpdate?(scene: ThrelteContext, delta: number): void;

	// Callback for setting up animation IK ?(inverse kinematics).
	OnAnimatorIK?(scene: ThrelteContext, delta: number): void;

	// Callback for processing animation movements for modifying root motion.
	OnAnimatorMove?(scene: ThrelteContext, delta: number): void;

	// Sent to all GameObjects when the player gets or loses focus.
	OnApplicationFocus?(scene: ThrelteContext, delta: number): void;

	// Sent to all GameObjects when the application pauses.
	OnApplicationPause?(scene: ThrelteContext, delta: number): void;

	// Sent to all GameObjects before the application quits.
	OnApplicationQuit?(scene: ThrelteContext, delta: number): void;

	// If OnAudioFilterRead is implemented, Unity will insert a custom filter into the audio DSP chain.
	OnAudioFilterRead?(scene: ThrelteContext, delta: number): void;

	// OnBecameInvisible is called when the renderer is no longer visible by any camera.
	OnBecameInvisible?(scene: ThrelteContext, delta: number): void;

	// OnBecameVisible is called when the renderer became visible by any camera.
	OnBecameVisible?(scene: ThrelteContext, delta: number): void;

	// OnCollisionEnter is called when this collider/rigidbody has begun touching another rigidbody/collider.
	OnCollisionEnter?(scene: ThrelteContext, delta: number): void;

	// Sent when an incoming collider makes contact with this object's collider ?(2D physics only).
	OnCollisionEnter2D?(scene: ThrelteContext, delta: number): void;

	// OnCollisionExit is called when this collider/rigidbody has stopped touching another rigidbody/collider.
	OnCollisionExit?(scene: ThrelteContext, delta: number): void;

	// Sent when a collider on another object stops touching this object's collider ?(2D physics only).
	OnCollisionExit2D?(scene: ThrelteContext, delta: number): void;

	// OnCollisionStay is called once per frame for every Collider or Rigidbody that touches another Collider or Rigidbody.
	OnCollisionStay?(scene: ThrelteContext, delta: number): void;

	// Sent each frame where a collider on another object is touching this object's collider ?(2D physics only).
	OnCollisionStay2D?(scene: ThrelteContext, delta: number): void;

	// Called on the client when you have successfully connected to a server.
	OnConnectedToServer?(scene: ThrelteContext, delta: number): void;

	// OnControllerColliderHit is called when the controller hits a collider while performing a Move.
	OnControllerColliderHit?(scene: ThrelteContext, delta: number): void;

	// Destroying the attached Behaviour will result in the game or Scene receiving OnDestroy.
	OnDestroy?(scene: ThrelteContext, delta: number): void;

	// This function is called when the behaviour becomes disabled.
	OnDisable?(scene: ThrelteContext, delta: number): void;

	// Called on the client when the connection was lost or you disconnected from the server.
	OnDisconnectedFromServer?(scene: ThrelteContext, delta: number): void;

	// Implement OnDrawGizmos if you want to draw gizmos that are also pickable and always drawn.
	OnDrawGizmos?(scene: ThrelteContext, delta: number): void;

	// Implement OnDrawGizmosSelected to draw a gizmo if the object is selected.
	OnDrawGizmosSelected?(scene: ThrelteContext, delta: number): void;

	// This function is called when the object becomes enabled and active.
	OnEnable?(scene: ThrelteContext, delta: number): void;

	// Called on the client when a connection attempt fails for some reason.
	OnFailedToConnect?(scene: ThrelteContext, delta: number): void;

	// Called on clients or servers when there is a problem connecting to the MasterServer.
	OnFailedToConnectToMasterServer?(scene: ThrelteContext, delta: number): void;

	// OnGUI is called for rendering and handling GUI events.
	OnGUI?(scene: ThrelteContext, delta: number): void;

	// Called when a joint attached to the same game object broke.
	OnJointBreak?(scene: ThrelteContext, delta: number): void;

	// Called when a Joint2D attached to the same game object breaks.
	OnJointBreak2D?(scene: ThrelteContext, delta: number): void;

	// Called on clients or servers when reporting events from the MasterServer.
	OnMasterServerEvent?(scene: ThrelteContext, delta: number): void;

	// OnMouseDown is called when the user has pressed the mouse button while over the Collider.
	OnMouseDown?(scene: ThrelteContext, delta: number): void;

	// OnMouseDrag is called when the user has clicked on a Collider and is still holding down the mouse.
	OnMouseDrag?(scene: ThrelteContext, delta: number): void;

	// Called when the mouse enters the Collider.
	OnMouseEnter?(scene: ThrelteContext, delta: number): void;

	// Called when the mouse is not any longer over the Collider.
	OnMouseExit?(scene: ThrelteContext, delta: number): void;

	// Called every frame while the mouse is over the Collider.
	OnMouseOver?(scene: ThrelteContext, delta: number): void;

	// OnMouseUp is called when the user has released the mouse button.
	OnMouseUp?(scene: ThrelteContext, delta: number): void;

	// OnMouseUpAsButton is only called when the mouse is released over the same Collider as it was pressed.
	OnMouseUpAsButton?(scene: ThrelteContext, delta: number): void;

	// Called on objects which have been network instantiated with Network.Instantiate.
	OnNetworkInstantiate?(scene: ThrelteContext, delta: number): void;

	// OnParticleCollision is called when a particle hits a Collider.
	OnParticleCollision?(scene: ThrelteContext, delta: number): void;

	// OnParticleSystemStopped is called when all particles in the system have died, and no new particles will be born. New particles cease to be created either after Stop is called, or when the duration property of a non-looping system has been exceeded.
	OnParticleSystemStopped?(scene: ThrelteContext, delta: number): void;

	// OnParticleTrigger is called when any particles in a Particle System meet the conditions in the trigger module.
	OnParticleTrigger?(scene: ThrelteContext, delta: number): void;

	// OnParticleUpdateJobScheduled is called when a Particle System's built-in update job has been scheduled.
	OnParticleUpdateJobScheduled?(scene: ThrelteContext, delta: number): void;

	// Called on the server whenever a new player has successfully connected.
	OnPlayerConnected?(scene: ThrelteContext, delta: number): void;

	// Called on the server whenever a player disconnected from the server.
	OnPlayerDisconnected?(scene: ThrelteContext, delta: number): void;

	// Event function that Unity calls after a Camera renders the scene.
	OnPostRender?(scene: ThrelteContext, delta: number): void;

	// Event function that Unity calls before a Camera culls the scene.
	OnPreCull?(scene: ThrelteContext, delta: number): void;

	// Event function that Unity calls before a Camera renders the scene.
	OnPreRender?(scene: ThrelteContext, delta: number): void;

	// Event function that Unity calls after a Camera has finished rendering, that allows you to modify the Camera's final image.
	OnRenderImage?(scene: ThrelteContext, delta: number): void;

	// OnRenderObject is called after camera has rendered the Scene.
	OnRenderObject?(scene: ThrelteContext, delta: number): void;

	// Used to customize synchronization of variables in a script watched by a network view.
	OnSerializeNetworkView?(scene: ThrelteContext, delta: number): void;

	// Called on the server whenever a Network.InitializeServer was invoked and has completed.
	OnServerInitialized?(scene: ThrelteContext, delta: number): void;

	// This function is called when the list of children of the transform of the GameObject has changed.
	OnTransformChildrenChanged?(scene: ThrelteContext, delta: number): void;

	// This function is called when a direct or indirect parent of the transform of the GameObject has changed.
	OnTransformParentChanged?(scene: ThrelteContext, delta: number): void;

	// When a GameObject collides with another GameObject, Unity calls OnTriggerEnter.
	OnTriggerEnter?(scene: ThrelteContext, delta: number): void;

	// Sent when another object enters a trigger collider attached to this object ?(2D physics only).
	OnTriggerEnter2D?(scene: ThrelteContext, delta: number): void;

	// OnTriggerExit is called when the Collider other has stopped touching the trigger.
	OnTriggerExit?(scene: ThrelteContext, delta: number): void;

	// Sent when another object leaves a trigger collider attached to this object ?(2D physics only).
	OnTriggerExit2D?(scene: ThrelteContext, delta: number): void;

	// OnTriggerStay is called once per physics update for every Collider other that is touching the trigger.
	OnTriggerStay?(scene: ThrelteContext, delta: number): void;

	// Sent each frame where another object is within a trigger collider attached to this object ?(2D physics only).
	OnTriggerStay2D?(scene: ThrelteContext, delta: number): void;

	// Editor-only function that Unity calls when the script is loaded or a value changes in the Inspector.
	OnValidate?(scene: ThrelteContext, delta: number): void;

	// OnWillRenderObject is called for each camera if the object is visible and not a UI element.
	OnWillRenderObject?(scene: ThrelteContext, delta: number): void;

	// Reset to default values.
	Reset?(scene: ThrelteContext, delta: number): void;

	// Start is called on the frame when a script is enabled just before any of the Update methods are called the first time.
	Start?(scene: ThrelteContext, delta: number): void;

	// Update is called every frame, if the MonoBehaviour is enabled.
	Update?(scene: ThrelteContext, delta: number): void;
}
export interface GameObject {
	// position of the object in 3d space.

	// UUID/GUID of the component instance
	id: string;

	// friendly name of the component
	name: string;

	// tagging elements for render layers and quick recall by threlte
	tags: string[];

	children: any[];
}
