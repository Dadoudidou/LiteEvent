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

// create event manager
let rdvEvents = new LiteEventManager<RdvEvents>();
rdvEvents.add("addRdv");
rdvEvents.add("getRdv"),
rdvEvents.add("removeRdv");

// add callback function
rdvEvents.on("addRdv", (rdv) => { })
rdvEvents.on("getRdv", (rdv) => { })
rdvEvents.on("removeRdv", (rdv) => { })

// trigger event
rdvEvents.trigger("addRdv")(new Rdv())
```

