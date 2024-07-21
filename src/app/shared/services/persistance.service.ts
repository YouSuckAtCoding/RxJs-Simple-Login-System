import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',

})

export class PersistanceService{
    set(key: string, data:unknown) : void
    {
        try
        {
            localStorage.setItem(key, JSON.stringify(data));
        }
        catch(e)
        {
            console.log('Error saving to local storage', e)
        }
    }

    get(key: string): unknown
    {
        try
        {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null
        }
        catch(e)
        {
            console.log('Error saving to local storage', e)
            return null;
        }
    }
}