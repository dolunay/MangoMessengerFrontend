# BEFORE READING THIS NOTES, PLEASE READ MINIMAL DOCS ABOUT ANGULAR AND NOT WRITE CRAP CODE

# Changelog

# Version 0.0.1 [10.12.2023] 🔥

---

# Change Notes ✋

# What's updated

## Updates

1. ⬆️ Updated Angular version to 17.0.6
2. ⬆️ Updated `ng-emoji-mart` package version 9.2.0 version

## Removes/Enrolling

### Angular

1.  ♻️ Enrolled all `Ngx-Auto-unsubscride` notes to `DestroyRef`(very useful feature from v 16 of Angular)
2.  ♻️ Removed all unused Life-cycle hooks `onDestroy - like`. IMPORTANT!!! OnDestroy not optimizing unsubscribes, use `DestroyRef` or special decorators/service if yoy use old angular versions
3.  ♻️ Removed Observable creation from `ProfileSettingsComponent` to `UsersService` - because it's righteous Angular way
4.  📝 Almost all models reworked to interface or type
5.  📝 All components successfully migrated to OnPush change detection asn standalone
6.  ♻️ Deleted all modules
7.  📝 All imports from material were issued to additional constant - `MatImports`
8.  ♻️ Removed `ts-ignore` notes
9.  ♻️ Almost all `NgModel` note removed from templates and form object enrolled to reactive form
10. ♻️ All routing moved to `app.routing.ts` and make reworked to lazy
11. 📝 ViewChild fully typed fow now
12. 📝 Almost all Components enrolled to `OnPush` change detection strategy [read docs](https://angular.io/api/core/ChangeDetectionStrategy)
13. 📝 Almost all `console.log` ang `alert` successfully removed. If you need debug, use debugger of material snackbar in prod and development

## Additions

### Linting

1.  ✅ EsLint config for writing better clean code later

### Angular

1.  ✅ Added PURE pipe for dynamic image path changing
2.  ✅ Added autofocus directive

### package.json

1.  ✅ Added husky scripts for increasing clean code before commits
2.  ✅ Added commit lint configs and script for increasing clean commit messages
3.  ✅ Added stylelint for linting stylesheets

## tsconfig

1.  ✅ Added paths section for more ez importing and navigation between files

## staged files

1. ✅ Added lint-staged section for increasing your developing experience

---

# Q/A

> Why i remove `NgxAutoUnsubscribe` from all components?
>
> > This not need anymore, because in version 16 Angular team creates `DestroyRef` class for us and this class make experience in angular completely ez [read the docs about him](https://angular.io/api/core/DestroyRef)

> Why i remove all angular/material imports from components?
>
> > Because they doesn't need in component imports section [read docs](https://angular.io/api/router/Route#loadChildren)

> Why i roll all regular routing to lazy?
>
> > Because lazy routing not load all components if we navigated to concrete route and load only concrete component.

> Why i move all components to standalone?
>
> > Because this movement will be decreasing bundle size [docs](https://angular.io/api/core/Component)

> Why you need husky, ESLint, CommitLint and Stylelint?
>
> > Because this make your code and commits less like shit

> Why I change `NgModel` to Reactive form?
>
> > Because NgModel developed not for forms. I know that Angular has template driven forms, but it uses a much more interesting mechanism than just NgModel. And storing the form in an object is a very bad idea, it’s better to use ReactiveForms and FormBuilder, which is then typed in 2 clicks see the `TypedControl` util type

---

# FACTS

1.  In fact, I completely rewrote this project the way it +- should look

## Parting letter

> Dear Razumovsky, you and your team write so much crooked and crappy code that with all due respect to Khachatur and you, if I were an employer, I would hire you all only on the condition that all three of you would pay me per month exactly as much as you would like to earn as a developer. and that's what I want to suggest. You either write to me about all your questions and I give you links to study or show you how to do it correctly whenever possible, or you don’t get involved in development at all and cut all your projects to hell from GitHub

# Thanks.

# Fucking Idiots
