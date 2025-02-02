const dbName = 'WebDia';
var storeName  = 'DiaData';
const DB_VERSION=1;
function onupgradeneeded(event){
    const db = event.target.result;
    console.log(db);
    const dbVersion = db.version;
    if(dbVersion<=1){
        db.createObjectStore(storeName, {keyPath : 'fileName'})
    }
}

export function getFiles(){
    return new Promise<any>((resolve,reject)=>{

    const openReq:IDBOpenDBRequest  = indexedDB.open(dbName,DB_VERSION);
//　DB名を指定して接続。DBがなければ新規作成される。
    openReq.onupgradeneeded = onupgradeneeded;
    console.log("test");

    openReq.onsuccess = function(event){
        console.log(event);
        //@ts-ignore
        const db:IDBDatabase = event.target.result;
        const trans = db.transaction(storeName, 'readonly');
        const store = trans.objectStore(storeName);
        const req=store.getAllKeys();
        req.onsuccess = function(event){
            //@ts-ignore
            resolve(event.target.result);
        }
        req.onerror = function(){
            reject();
            console.log('get data error');
        }
    }
    openReq.onerror = function(event){
        reject();

        // 接続に失敗
        console.log('db open error');
    }
    }
    );
}
export function getFile(fileName:string){
    return new Promise<any>((resolve,reject)=>{
        const openReq:IDBOpenDBRequest  = indexedDB.open(dbName,DB_VERSION);
        openReq.onupgradeneeded = onupgradeneeded;
        openReq.onsuccess = function(event) {
            //@ts-ignore
            const db: IDBDatabase = event.target.result;
            const trans = db.transaction(storeName, 'readonly');
            const store = trans.objectStore(storeName);
            const getReq = store.get(fileName);

            getReq.onsuccess = function (event) {
                //@ts-ignore
                resolve(event.target.result);
            }
            getReq.onerror = function () {
                console.log('get data error');
                reject();
            }
        }
        openReq.onerror = function(event){
            // 接続に失敗
            console.log('db open error');
            reject();
        }
    });

}
export function saveData(fileName:string,data:any):Promise<void>{
    return new Promise<void>((resolve,reject)=>{

        const openReq  = indexedDB.open(dbName,DB_VERSION);
    //　DB名を指定して接続。DBがなければ新規作成される。
        openReq.onupgradeneeded = onupgradeneeded;
        openReq.onsuccess = function(event){
            //@ts-ignore
            const db:IDBDatabase = event.target.result;
            const trans = db.transaction(storeName, 'readwrite');
            const store = trans.objectStore(storeName);
            const putReq = store.put({fileName:fileName, data:data});
            putReq.onsuccess = function(){
                console.log('put data success');
            }
            putReq.onerror = function(){
                console.log('put data error');
                reject();
            }
            trans.oncomplete = function(){
                // トランザクション完了時(putReq.onsuccessの後)に実行
                console.log('transaction complete');
                resolve();

            }
            db.close();
        }
        openReq.onerror = function(event){
            // 接続に失敗
            console.log('db open error');
            reject();
        }
    });


}

