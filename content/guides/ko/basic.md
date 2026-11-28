---
title: 기본 사용법
description: 기본기를 배우며 Astro를 시작해 보세요
---

## Astro로 무엇을 할 수 있나요?

Astro는 Discord의 음성 부분에만 집중하고, 독특하고 고급스러운 기능으로 이를 한층 더 발전시켜요.

핵심 기능은 임시 음성 채널이에요.  
임시 음성 채널은 생성기(Astro가 만들고 관리해요)가 만들어요. 사용자가 생성기에 참여하면 Astro가 해당 사용자를 위한 임시 음성 채널을 만들고 그 안으로 이동시켜요. 임시 음성 채널이 비면 Astro가 자동으로 삭제해요.  
덕분에 서버에 빈 음성 채널이 잔뜩 남아 있을 일이 없어요!

여기에 더해 Astro는 사용자가 자신의 임시 음성 채널을 관리할 수 있는 방법을 제공해요. 채널 이름 변경, 사용자 제한 변경, 채널 잠금 / 숨기기 등 많은 기능이 있어요. 슬래시 명령어나 Astro 인터페이스로 사용할 수 있어요. 인터페이스는 Astro가 만든 버튼이 달린 메시지로, 사용자가 자신의 음성 채널에서 빠르게 동작을 수행할 수 있게 해줘요.

또한 Astro는 여러 설정을 묶어서 임시 음성 채널에 한 번에 적용하는 템플릿 기능을 제공해요. 예를 들어 사용자들이 여러 게임을 하는 게임 서버라면 게임마다 고유한 이름, 사용자 제한 등을 가진 템플릿을 만들 수 있어요.

또 하나의 매우 유용한 기능은 음성 역할이에요. 음성 역할을 사용하면 사용자가 특정 음성 채널에 있을 때 특정 역할을 받도록 할 수 있어요. 정말 강력하고 다양한 상황에서 활용할 수 있는 기능이에요.

이 모든 기능에 대해서는 해당 [가이드](/guides)에서 더 자세히 읽을 수 있어요.  
여기서는 서버에서 Astro를 시작하는 기본적인 방법을 다뤄요!

## 봇 초대하기

가장 먼저 봇을 서버에 초대하세요. [이 링크](/invite)를 클릭해서 서버를 선택하기만 하면 돼요!  
아니면 [대시보드](/guilds)에 들어가도 돼요. 관리하려는 서버에 Astro가 아직 추가되지 않았다면 자동으로 초대하라는 안내가 나와요.

## 빠른 설정

모든 걸 직접 설정하기 싫으신가요? `/setup` 명령어나 Astro가 서버에 참여할 때 보내는 설정 버튼을 사용하세요.  
Astro가 생성기와 인터페이스가 들어 있는 카테고리를 만들어서 임시 음성 채널을 바로 쓸 수 있어요. 이후 [대시보드](/guilds)에서 이름, 카테고리, 위치 등 모든 것을 바꿀 수 있어요.

## 서버 요구 사항

서버에서 Astro를 사용하려면 다음 요구 사항을 충족해야 해요:

- 봇이 50개 미만일 것 (Discord가 정한 제한)
- 최소한 `채널 관리` 권한이 있을 것

## 봇 권한

Astro는 평범한 Discord 사용자에게 훌륭한 경험을 제공하기 위해 기본적으로 `관리자` 권한을 요구해요.

전문적인 서버를 운영하고 있어서 보안상 Astro에게 그 권한을 줄 수 없다면, 대시보드의 토글로 이 요구 사항을 끌 수 있어요
![관리자 권한 토글](/guides/admin_permissions.png '관리자 권한 토글')
_Astro가 작동하는 데 필요한 권한에 대한 안내는 지원 서버에서 물어볼 수 있지만, 이에 대한 자세한 지원은 제공하지 않아요._

## 명령어 권한

Discord 슬래시 명령어 권한을 통해 Astro 슬래시 명령어를 누가 사용할 수 있는지 언제든지 설정할 수 있다는 점을 기억하세요.  
[여기에서 더 알아보세요](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## 서버 언어

대시보드 설정에서 서버의 언어를 바꿀 수 있고, 봇이 그곳에 보내는 모든 메시지가 이 언어를 따라요.

## 봇 프로필

Astro가 서버의 일부처럼 보이길 원하나요? 대시보드에서 서버 전용으로 별명, 아바타, 배너, 소개를 설정할 수 있어요.

## 오류 및 문제

Astro는 서버에서 작동하는 동안 겪는 모든 문제와 오류를 보고해요.  
무언가 제대로 작동하지 않는 것 같을 때는 대시보드의 오류 섹션을 확인하세요!

## Ultimate

Ultimate는 Astro의 프리미엄 버전으로, 모든 제한을 없애고 유용한 고급 기능을 많이 제공해요:

| 기능                                 |                     프리미엄                      |                            무료                            |
| ------------------------------------ | :-----------------------------------------------: | :--------------------------------------------------------: |
| 무제한 임시 음성 채널 생성기         | <span class="text-discord-green text-lg">✓</span> |                          최대 2개                          |
| 무제한 인터페이스                    | <span class="text-discord-green text-lg">✓</span> |                          최대 1개                          |
| 무제한 음성 역할                     | <span class="text-discord-green text-lg">✓</span> |                          최대 1개                          |
| 무제한 템플릿                        | <span class="text-discord-green text-lg">✓</span> |                          최대 3개                          |
| 번호가 매겨진 음성 채널 이름         | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| 커스터마이징 가능한 인터페이스       | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| 음성 채널 이름 비속어 필터           | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| 대기실                               | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| 비공개 텍스트 채팅                   | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| 채널 소유자용 음성 역할              | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| 음성 채널 생성 시 사용자 지정 메시지 | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| 대체 생성기                          | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |

### 서버를 Ultimate로 업그레이드하기

[Ultimate 페이지](/ultimate)나 [Discord 앱 스토어](https://discord.com/application-directory/715621848489918495/premium)에서 구독을 구매한 뒤에는 대시보드의 버튼으로 서버를 업그레이드할 수 있어요
![Ultimate 업그레이드](/guides/ultimate.png 'Ultimate 업그레이드')

### 구독 관리하기

[결제 포털](/billing)에서 Ultimate 구독을 확인하고, 관리하고, 취소할 수 있어요.  
Discord 앱 스토어 결제로 Ultimate를 구매했다면 [이 가이드](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ)를 참고하세요.

## 지원

궁금한 점이 있다면 언제든지 [지원 / 커뮤니티 서버](/support)에 참여하세요!
