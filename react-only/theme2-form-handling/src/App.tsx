//見本

// import { useState } from "react";

// type Form = { name: string; email: string; age: string };
// type Errors = Partial<Record<keyof Form, string>>;

// const emailRe = /^\S+@\S+\.\S+$/;
// const numRe = /^\d+$/;

// export default function App() {
//   const [form, setForm] = useState<Form>({ name: "", email: "", age: "" });
//   const [errors, setErrors] = useState<Errors>({});
//   const [busy, setBusy] = useState(false);

//   const validate = (f: Form): Errors => {
//     const e: Errors = {};
//     if (!f.name.trim()) e.name = "必須";
//     if (!emailRe.test(f.email)) e.email = "形式";
//     if (!numRe.test(f.age)) e.age = "数字";
//     return e;
//   };

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const k = e.target.name as keyof Form;
//     const next = { ...form, [k]: e.target.value };
//     setForm(next);
//     setErrors(validate(next)); // 常に簡易チェック
//   };

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const v = validate(form);
//     setErrors(v);
//     if (Object.keys(v).length) return;

//     setBusy(true);
//     // 擬似送信（ここをfetchに置き換えればAPI連携）
//     await new Promise((r) => setTimeout(r, 300));
//     console.log("payload:", { ...form, age: Number(form.age) });
//     setBusy(false);

//     // 結果確認しやすいようにリセット
//     setForm({ name: "", email: "", age: "" });
//     setErrors({});
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//       width: '100%'
//     }}>
//       <form onSubmit={onSubmit} style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '1rem',
//         width: '100%',
//         maxWidth: '400px',
//         padding: '2rem',
//         border: '1px solid #ccc',
//         borderRadius: '8px',
//         backgroundColor: '#f9f9f9'
//       }}>
//         <h1 style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>フォーム</h1>
        
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//           <input
//             name="name"
//             placeholder="Name"
//             value={form.name}
//             onChange={onChange}
//             style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
//           />
//           {errors.name && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.name}</span>}
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//           <input
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={onChange}
//             inputMode="email"
//             style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
//           />
//           {errors.email && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.email}</span>}
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//           <input
//             name="age"
//             placeholder="Age"
//             value={form.age}
//             onChange={onChange}
//             inputMode="numeric"
//             style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
//           />
//           {errors.age && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.age}</span>}
//         </div>

//         <button 
//           type="submit" 
//           disabled={busy || Object.keys(errors).length > 0}
//           style={{
//             padding: '0.75rem',
//             borderRadius: '4px',
//             border: 'none',
//             backgroundColor: busy || Object.keys(errors).length > 0 ? '#ccc' : '#007bff',
//             color: 'white',
//             cursor: busy || Object.keys(errors).length > 0 ? 'not-allowed' : 'pointer',
//             fontSize: '1rem'
//           }}
//         >
//           {busy ? "送信中..." : "送信"}
//         </button>
//       </form>
//     </div>
//   );
// }

// // Day1
// import{ useState } from 'react';

// // 型定義
// // ageは数字でもええやん→空白文字があったら扱いにくいので文字列としてる
// type Form = { name: string, email: string, age: string}; 
// // ErrorsはFormの各キーに任意のエラーメッセージ(string)を載せる役割。Partialなので存在しない→エラーなし
// type Errors = Partial<Record<keyof Form, string>>;

// //バリデーション
// const emailRe = /^\S+@\S+\.\S+$/;
// const numRe = /^\d+$/;

// export default function App() {
//   const [form, setForm] = useState<Form>({ name: "", email: "", age: ""});
//   const [errors, setErrors] = useState<Errors>({});
//   //busyは送信処理の実行中タグ
//   const [busy, setBusy] = useState(false);

//   const validate = (f: Form): Errors => {
//     const e: Errors = {};
//     //trimすることで空白の場合に空白が除去されてエラーになる
//     if (!f.name.trim()) e.name = "必須";
//     //emailとageを正規化して真偽値バリデーション
//     if(!emailRe.test(f.email)) e.email = "形式";
//     if(!numRe.test(f.age)) e.age = "数字";

//     return e;
//   }

//   //制御
//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //Formのどれか、つまりname、email、ageのどれかを変更、入力するたびにvalidate(next)を回してエラー更新
//     const k = e.target.name as keyof Form;
//     //e.target.valueは入力した値でこれがnextに入る
//     const next = { ...form, [k]: e.target.value};
//     setForm(next);
//     setErrors(validate(next)); //常にチェック
//   }

//   //送信
//   const onSubmit = async (e: React.FormEvent) => {
//     //リロードを防ぐ
//     e.preventDefault();
//     const v = validate(form);
//     setErrors(v);
//     //エラーがあれば送信しない、ここでエラーがある項目名の配列を取得して値があるかどうか判断
//     if (Object.keys(v).length) return;

//     setBusy(true);
//     //擬似送信(ここをfetchに変えたらAPI連携)
//     await new Promise((r) => setTimeout(r, 300));
//     console.log("payload", { ...form, age: Number(form.age)});
//     setBusy(false);

//     //結果確認しやすいようにリセット
//     setForm({ name: "", email: "", age: ""});
//     setErrors({});
//   }

//   return (
//     <div>
//       <form 
//       onSubmit={onSubmit}
//       >
//         <h1>フォーム</h1>
//         <div>
//           <input
//            name="name"
//            placeholder="Name"
//            value={form.name}
//            onChange={onChange}
//            />
//            {errors.name && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.name}</span>} 
//            {/* エラー条件下で表示 */}
//         </div>
//         <div>
//           <input
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={onChange}
//             inputMode="email"
//            />
//            {errors.email && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.email}</span>}
//         </div>
//         <div>
//         <input
//           name="age"
//           placeholder="Age"
//           value={form.age}
//           onChange={onChange}
//           inputMode="numeric"
//         />
//         {errors.age && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.age}</span>}
//         </div>
//         <button
//           type="submit"
//           disabled={busy || Object.keys(errors).length > 0}
//         >
//           {busy ? "送信中..." : "送信"}
//         </button>
//       </form>
//     </div>
//   );
// }

// // Day2(まずはDay1の復習)
// import { useState} from 'react';

// type Form = { name: string, email: string, age: string};
// type Errors = Partial<Record<keyof Form, string>>;

// const emailRe = /^\S+@\S+\.\S+$/;
// const numRe = /^\d+$/;

// export default function App() {
//   const [form, setForm] = useState<Form>({ name: "", email: "", age: ""});
//   const [errors, setErrors] = useState<Errors>({});
//   const [busy, setBusy] = useState(false);

//   const validate = (f: Form): Errors => {
//     const e: Errors = {};
//     if (!f.name.trim()) e.name = "必須";
//     if (!emailRe.test(f.email)) e.email = "形式";
//     if (!numRe.test(f.age)) e.age = "数字" ;

//     return e;
//   }

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const k = e.target.name as keyof Form;
//     const next = { ...form, [k]: e.target.value};
//     setForm(next);
//     setErrors(validate(next));
//   }

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const v = validate(form);
//     setErrors(v);
//     if (Object.keys(v).length) return;

//     setBusy(true);
//     await new Promise((r) => setTimeout(r, 300));
//     console.log("payload", { ...form, age: Number(form.age)});
//     setBusy(false);

//     setForm({ name: "", email: "", age: ""});
//     setErrors({});
//   }

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <h1>フォーム</h1>
//         <div>
//           <input
//             name="name" 
//             placeholder="Name"
//             value={form.name}
//             onChange={onChange}
//            />
//            {errors.name && <span style={{ color: 'red', fontSize: '0.875rem'}}>{errors.name}</span>}
//         </div>
//         <div>
//           <input
//             name="email" 
//             placeholder="Email"
//             value={form.email}
//             onChange={onChange}
//             inputMode="email"
//            />
//            {errors.email && <span style={{ color: 'red', fontSize: '0.875rem'}}>{errors.email}</span>}
//         </div>
//         <div>
//           <input
//             name="age" 
//             placeholder="Age"
//             value={form.age}
//             onChange={onChange}
//             inputMode="numeric"
//            />
//            {errors.age && <span style={{ color: 'red', fontSize: '0.875rem'}}>{errors.age}</span>}
//         </div>
//         <button
//           type="submit"
//           disabled={busy || Object.keys(errors).length > 0}
//         >
//           {busy ? "送信中" : "送信"}
//         </button>
//       </form>
//     </div>
//   );
// }

// // Day3(リアルタイムバリデーション＋touched（触れた項目だけエラー表示）＋エラー箇所へ自動フォーカス)見本
// import { useRef, useState } from "react";

// type Form = { name: string; email: string; age: string };
// type Errors = Partial<Record<keyof Form, string>>;

// const emailRe = /^\S+@\S+\.\S+$/;
// const numRe = /^\d+$/;

// export default function App() {
//   const [form, setForm] = useState<Form>({ name: "", email: "", age: "" });
//   const [errors, setErrors] = useState<Errors>({});
//   const [touched, setTouched] = useState<Record<keyof Form, boolean>>({
//     name: false,
//     email: false,
//     age: false,
//   });
//   const [busy, setBusy] = useState(false);

//   // エラー発生時に自動フォーカスさせるためのref
//   const refs = {
//     name: useRef<HTMLInputElement>(null),
//     email: useRef<HTMLInputElement>(null),
//     age: useRef<HTMLInputElement>(null),
//   };

//   const validate = (f: Form): Errors => {
//     const e: Errors = {};
//     if (!f.name.trim()) e.name = "必須";
//     if (!emailRe.test(f.email)) e.email = "形式";
//     if (!numRe.test(f.age)) e.age = "数字";
//     return e;
//   };

//   // 入力のたびに値更新＋即時バリデーション
//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const k = e.target.name as keyof Form;
//     const next = { ...form, [k]: e.target.value };
//     setForm(next);
//     setErrors(validate(next));
//   };

//   // 触れた項目だけエラーを見せる
//   const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//     const k = e.target.name as keyof Form;
//     setTouched((t) => ({ ...t, [k]: true }));
//   };

//   //エラー項目のうち、最初の一つを取得するための関数
//   const firstErrorKey = (e: Errors): keyof Form | undefined =>
//     (["name", "email", "age"] as (keyof Form)[]).find((k) => e[k]);

//   const onSubmit = async (e: React.FormEvent) => {
//     //デフォルトで「送信」するとページをリロードするので防止する
//     e.preventDefault();
//     // 送信時は全項目をtouchedにしてエラーを全部表示
//     setTouched({ name: true, email: true, age: true });

//     const v = validate(form);
//     setErrors(v);

//     //エラー項目のうち最初のひとつを取得
//     const bad = firstErrorKey(v);
//     if (bad) {
//       refs[bad].current?.focus(); // 最初のエラーへフォーカス
//       return;
//     }

//     setBusy(true);
//     try {
//       // 擬似送信（ここをfetchに差し替え可）
//       await new Promise((r) => setTimeout(r, 300));
//       console.log("payload", { ...form, age: Number(form.age) });

//       // 成功したらリセット
//       setForm({ name: "", email: "", age: "" });
//       setErrors({});
//       setTouched({ name: false, email: false, age: false });
//     } finally {
//       setBusy(false);
//     }
//   };

//   const show = (k: keyof Form) => touched[k] && errors[k];
//   const hasError = Object.keys(errors).length > 0;

//   return (
//     <form onSubmit={onSubmit}>
//       <h1>フォーム</h1>

//       <div>
//         <input
//           ref={refs.name}
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={onChange}
//           onBlur={onBlur}
//         />
//         {show("name") && <span style={{ color: "red" }}>{errors.name}</span>}
//       </div>

//       <div>
//         <input
//           ref={refs.email}
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={onChange}
//           onBlur={onBlur}
//           inputMode="email"
//         />
//         {show("email") && <span style={{ color: "red" }}>{errors.email}</span>}
//       </div>

//       <div>
//         <input
//           ref={refs.age}
//           name="age"
//           placeholder="Age"
//           value={form.age}
//           onChange={onChange}
//           onBlur={onBlur}
//           inputMode="numeric"
//         />
//         {show("age") && <span style={{ color: "red" }}>{errors.age}</span>}
//       </div>

//       <button type="submit" disabled={busy || hasError}>
//         {busy ? "送信中..." : "送信"}
//       </button>
//     </form>
//   );
// }

// Day3
import { useState, useRef } from 'react';

type Form = {name: string, email: string, age: string};
type Errors = Partial<Record<keyof Form, string>>;

const emailRe = /^\S+@\S+\.\S+$/;
const numRe = /^\d+$/;

export default function App() {
  const [form, setForm] = useState<Form>({name: "", email: "", age: ""});
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<keyof Form, boolean>>({
    name: false,
    email: false,
    age: false,
  });
  const [busy, setBusy] = useState(false);

  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
  };

  const validate = (f: Form): Errors => {
    const e: Errors = {};
    if (!f.name.trim()) e.name = "必須";
    if (!emailRe.test(f.email)) e.email = "形式";
    if (!numRe.test(f.age)) e.age = "数字";
    return e;
  };
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const k = e.target.name as keyof Form;
    const next = {... form, [k]: e.target.value};
    setForm(next);
    setErrors(validate(next));
  };

  //触れた項目だけエラー見せる
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const k = e.target.name as keyof Form;
    //「直前の state の値」が t に入り、前の値をベースにして部分的に更新する
    setTouched((t) => ({... t, [k]: true}));
  };

  //エラー項目のうち最初の一つを取得するための関数
  const firstErrorKey = (e: Errors): keyof Form | undefined => 
  (['name', 'email', 'age'] as (keyof Form)[]).find((k) => e[k]);
  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({name: true, email: true, age: true});

    const v = validate(form);
    setErrors(v);

    //エラー項目の最初の一つを取得し、エラーがあればフォーカス
    const bad = firstErrorKey(v);
    if (bad) {
      refs[bad].current?.focus();
      return;
    }

    setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      console.log("payload", {... form, age: Number(form.age)});

      setForm({name: "", email: "", age: ""});
      setErrors({});
      setTouched({name: false, email: false, age: false});
    } finally {
      setBusy(false);
    }
  };

  const show = (k: keyof Form) => touched[k] && errors[k];
  const hasError = Object.keys(errors).length > 0;

  return (
    <form onSubmit={onSubmit}>
      <h1>フォーム</h1>
      <div>
        <input 
          ref={refs.name}
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          onBlur={onBlur}
        />
       {show("name") && <span style={{ color: "red"}}>{errors.name}</span>}
      </div>
      <div>
        <input 
            ref={refs.email}
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            onBlur={onBlur}
            inputMode="email"
        />
        {show("email") && <span style={{ color: "red"}}>{errors.email}</span>}
      </div>
      <div>
        <input 
            ref={refs.age}
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={onChange}
            onBlur={onBlur}
            inputMode="numeric"
          />
        {show("age") && <span style={{ color: "red"}}>{errors.age}</span>}
      </div>
      <button type ="submit" disabled={busy || hasError}>
        {busy ? "送信中..." : "送信"}
      </button>
    </form>
  )
}

