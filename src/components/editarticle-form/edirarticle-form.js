import React from "react";
import styles from "./edirarticle-form.module.css";
import { useForm } from "react-hook-form";
import { signUpApi } from "./api-edirarticle";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const EditArticleForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    // reset,
    getValues,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  //   const [signUp, { isLoading, response }] = signUpApi.useSignUpMutation();

  // const navigate = useNavigate();

  const onSubmit = async (userData) => {
    console.log(userData);
    delete userData.repeatpassword;
    delete userData.terms;
    // try {
    //   const result = await signUp({ user: userData }).unwrap();
    //   window.localStorage.setItem("user.token", result.user.token);
    //   navigate("/");
    //   // const result = await signUp(JSON.stringify({ user: userData })).unwrap()
    //   // reset();
    // } catch (error) {
    //   console.error("Ошибка при регистрации:", error);
    //   alert(
    //     "Произошла ошибка при регистрации, пожалуйста, попробуйте еще раз."
    //   );
    // }
  };

  return (
    <article className={styles["newarticle-form"]}>
      <div className={styles["content-wrapper"]}>
        <span className={styles["title"]}>Edit article</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className={styles["input-wrapper"]}>
            <label className={styles["label"]}>
              Title
              <input
                className={styles["input"]}
                placeholder="Title"
                {...register("title", {
                  required: "Поле обязательно к заполнению",
                  minLength: {
                    value: 3,
                    message: "Имя пользователя должно быть минимум 3 символа",
                  },
                  maxLength: {
                    value: 20,
                    message: "Имя пользователя не может быть более 20 символов",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Имя пользователя может содержать только буквы латинского алфавита, цифры и символ подчеркивания",
                  },
                })}
              />
            </label>
            <div className={styles["error"]}>
              {errors?.title && (
                <span>{errors?.title?.message || "Error!"}</span>
              )}
            </div>
          </div>

          {/* Short description */}
          <div className={styles["input-wrapper"]}>
            <label className={styles["label"]}>
              Short description
              <input
                className={styles["input"]}
                placeholder="Short description"
                {...register("description", {
                  required: "Поле обязательно к заполнению",
                  minLength: {
                    value: 3,
                    message: "Имя пользователя должно быть минимум 3 символа",
                  },
                  maxLength: {
                    value: 20,
                    message: "Имя пользователя не может быть более 20 символов",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Имя пользователя может содержать только буквы латинского алфавита, цифры и символ подчеркивания",
                  },
                })}
              />
            </label>
            <div className={styles["error"]}>
              {errors?.description && (
                <span>{errors?.description?.message || "Error!"}</span>
              )}
            </div>
          </div>

          {/* Text */}
          <div className={styles["input-wrapper"]}>
            <label className={styles["label"]}>
              Text
              <textarea
                autoFocus
                type="text"
                className={styles["article"]}
                placeholder="Text"
                {...register("text", {
                  required: "Поле обязательно к заполнению",
                  minLength: {
                    value: 3,
                    message: "Имя пользователя должно быть минимум 3 символа",
                  },
                  maxLength: {
                    value: 500,
                    message: "Имя пользователя не может быть более 20 символов",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Имя пользователя может содержать только буквы латинского алфавита, цифры и символ подчеркивания",
                  },
                })}
              />
            </label>
            <div className={styles["error"]}>
              {errors?.text && <span>{errors?.text?.message || "Error!"}</span>}
            </div>
          </div>

          {/* Tags */}

          <div className={styles["tag-wrapper"]}>
            <div className={styles["input-wrapper"]}>
              <label className={styles["label"]}>
                Tags
                <input
                  className={styles["tag"]}
                  placeholder="Tag"
                  {...register("tag", {
                    minLength: {
                      value: 3,
                      message: "Имя пользователя должно быть минимум 3 символа",
                    },
                    maxLength: {
                      value: 20,
                      message:
                        "Имя пользователя не может быть более 20 символов",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Имя пользователя может содержать только буквы латинского алфавита, цифры и символ подчеркивания",
                    },
                  })}
                />
              </label>
              <div className={styles["error"]}>
                {errors?.tag && <span>{errors?.tag?.message || "Error!"}</span>}
              </div>
            </div>

            <Button
              className={styles["button-delTag"]}
              type="text"
              // onClick={handleClickNewArticle}
            >
              Delete
            </Button>

            <Button
              className={styles["button-addTag"]}
              type="text"
              // onClick={handleClickNewArticle}
            >
              Add tag
            </Button>
          </div>

          {/* <div className={styles['error']}>
						{errors?.terms && <span>{errors?.terms?.message || 'Error!'}</span>}
					</div> */}
          <div className={styles["button-wrapper"]}>
            <button
              className={styles["button"]}
              type="submit"
              disabled={!isValid}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};
export default EditArticleForm;
