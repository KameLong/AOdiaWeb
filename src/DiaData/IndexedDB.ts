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

/**
 * OPFS にテキストファイルを保存する
 * @param {string} fileName    保存するファイル名（例: "data.txt"）
 * @param {string} contentText ファイルに書き込むテキスト
 */
export async function saveToOPFS(fileName, contentText) {
    // OPFS が使えるか確認
    if (!navigator.storage || !navigator.storage.getDirectory) {
        throw new Error("このブラウザは OPFS (Origin-Private File System) に対応していません。");
    }

    try {
        // OPFS のルートディレクトリハンドルを取得
        const rootDir = await navigator.storage.getDirectory();

        // ファイルハンドルを取得（なければ作成）
        const fileHandle = await rootDir.getFileHandle(fileName, { create: true });

        // 書き込み用ストリームを開く
        const writable = await fileHandle.createWritable();

        // テキストを書き込む
        await writable.write(contentText);

        // ストリームをクローズして確定
        await writable.close();

        console.log(`OPFS に ${fileName} を保存しました。`);
    } catch (err) {
        console.error("OPFS への保存中にエラーが発生しました:", err);
        throw err;
    }
}

export function saveData(fileName:string,data:any):Promise<void>{
    return new Promise<void>((resolve,reject)=>{


    });


}

