### Lite Event

```
// create lite event
var onAdd = new LiteEvent<string>();

// add callback function
var callback = (data?: string) => { console.log(data) }
onAdd.on(callback);

// trigger onAdd Event
onAdd.trigger("test");

// remove callback function
onAdd.off(callback);
```

### Lite Event Manager

```
class Rdv {}

// type events { [eventName]: trigger type }
type RdvEvents = {
    addRdv: Rdv
    removeRdv: Rdv
    getRdv: Rdv
}

const onAddRdv = (rdv) => {}

// create event manager
let rdvEvents = new LiteEventManager<RdvEvents>();
rdvEvents.add("addRdv");
rdvEvents.add("getRdv"),
rdvEvents.add("removeRdv");

// add callback function
rdvEvents.on("addRdv", onAddRdv)
rdvEvents.on("getRdv", (rdv) => { })
var _event = rdvEvents.on("removeRdv", (rdv) => { })
_event.detach(); // detach event
_event.attach(); // attach event

// create and add event
rdvEvents.on("testRdv", (rdv) => {})

// listen multiple events
rdvEvents.on(["addRdv", "removeRdv"], (rdv) => {})

// trigger event
rdvEvents.trigger("addRdv")(new Rdv())

// stop listening event
rdvEvents.off("addRdv", onAddRdv);
rdvEvents.off("addRdv");
rdvEvents.off(onAddRdv);
```

